import React, { useState, useEffect, useRef } from 'react';
import { Play, RefreshCw, Cpu, Layers, CheckCircle2, ShieldCheck, Sliders, Eye, EyeOff } from 'lucide-react';
import { useIncident } from '../context/IncidentContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const SARViewer = () => {
  const { activeIncident, detectionState, setDetectionState } = useIncident();
  const [showMask, setShowMask] = useState(true);
  const [showBoundary, setShowBoundary] = useState(true);
  const [progress, setProgress] = useState(100);
  const [statusMessage, setStatusMessage] = useState('Inference Complete: Oil Slick Detected');
  const canvasRef = useRef(null);

  // Run simulated detection pipeline
  const handleRunDetection = () => {
    setDetectionState('PROCESSING');
    setProgress(0);
    setStatusMessage('Ingesting Sentinel-1 SAR level-1 GRD swath...');

    let p = 0;
    const interval = setInterval(() => {
      p += 15;
      if (p === 30) {
        setStatusMessage('Applying Lee filter speckle reduction & calibration...');
      } else if (p === 60) {
        setStatusMessage('Running U-Net deep segmentation tensor pass...');
      } else if (p === 90) {
        setStatusMessage('Extracting morphological boundary polygon & polygonizing...');
      } else if (p >= 100) {
        clearInterval(interval);
        setProgress(100);
        setDetectionState('COMPLETED');
        setStatusMessage('Inference Complete: Oil Slick Detected');
      }
      setProgress(Math.min(100, p));
    }, 280);
  };

  // Render simulated SAR radar imagery with speckle noise on canvas (Zero Blue/Purple)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // 1. Draw oceanic radar backscatter with authentic radar speckle noise
    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % width;
      const y = Math.floor((i / 4) / width);

      const noise = (Math.random() - 0.5) * 45;
      let val = 75 + noise;

      // Vignette effect
      const dx = (x - width / 2) / (width / 2);
      const dy = (y - height / 2) / (height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      val = val * (1 - dist * 0.22);

      // Authentic monochrome radar backscatter (NO blue tint)
      const grey = Math.max(18, Math.min(180, Math.round(val)));
      data[i] = grey;         // R
      data[i + 1] = grey;     // G
      data[i + 2] = grey;     // B
      data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);

    // 2. If detection is COMPLETED or during processing, draw the dark oil slick (capillary wave dampening)
    if (detectionState === 'COMPLETED' || detectionState === 'PROCESSING') {
      ctx.save();
      ctx.beginPath();
      // Main dark oil slick patch (dark backscatter anomaly)
      ctx.ellipse(width * 0.48, height * 0.52, 105, 42, -0.65, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(10, 10, 12, 0.95)';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
      ctx.shadowBlur = 14;
      ctx.fill();

      // Trailing thin feather
      ctx.beginPath();
      ctx.ellipse(width * 0.62, height * 0.38, 60, 20, -0.62, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(15, 15, 18, 0.9)';
      ctx.fill();
      ctx.restore();

      // 3. Draw AI Segmentation Mask overlay (Hazard Amber - Zero Blue/Purple)
      if (showMask && detectionState === 'COMPLETED') {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(width * 0.48, height * 0.52, 108, 44, -0.65, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(92, 10, 40, 0.22)';
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(width * 0.62, height * 0.38, 62, 22, -0.62, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(92, 10, 40, 0.22)';
        ctx.fill();
        ctx.restore();
      }

      // 4. Draw Vector Contour Boundary line (Hazard Amber - Zero Blue/Purple)
      if (showBoundary && detectionState === 'COMPLETED') {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(width * 0.48, height * 0.52, 109, 45, -0.65, 0, Math.PI * 2);
        ctx.strokeStyle = '#5C0A28';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(width * 0.62, height * 0.38, 63, 23, -0.62, 0, Math.PI * 2);
        ctx.strokeStyle = '#5C0A28';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.restore();
      }
    }

    // 5. Draw tactical HUD crosshairs and coordinates (Amber HUD)
    ctx.save();
    ctx.strokeStyle = 'rgba(92, 10, 40, 0.2)';
    ctx.lineWidth = 1;

    // Crosshairs
    ctx.beginPath();
    ctx.moveTo(width / 2, 10);
    ctx.lineTo(width / 2, height - 10);
    ctx.moveTo(10, height / 2);
    ctx.lineTo(width - 10, height / 2);
    ctx.stroke();

    // Corner brackets
    const bLen = 15;
    ctx.strokeStyle = 'rgba(92, 10, 40, 0.5)';
    ctx.beginPath();
    // Top-left
    ctx.moveTo(15, 15 + bLen); ctx.lineTo(15, 15); ctx.lineTo(15 + bLen, 15);
    // Top-right
    ctx.moveTo(width - 15 - bLen, 15); ctx.lineTo(width - 15, 15); ctx.lineTo(width - 15, 15 + bLen);
    // Bottom-left
    ctx.moveTo(15, height - 15 - bLen); ctx.lineTo(15, height - 15); ctx.lineTo(15 + bLen, height - 15);
    // Bottom-right
    ctx.moveTo(width - 15 - bLen, height - 15); ctx.lineTo(width - 15, height - 15); ctx.lineTo(width - 15, height - 15 - bLen);
    ctx.stroke();
    ctx.restore();
  }, [detectionState, showMask, showBoundary]);

  return (
    <Card className="border-border bg-card shadow-md">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-bold text-foreground font-mono">
              <Cpu className="text-burgundy-500" size={18} />
              SENTINEL-1 SAR IMAGERY & DEEP SEGMENTATION
            </CardTitle>
            <Badge variant="amber" className="text-[10px]">
              {activeIncident?.sarSatellite?.split(' ')[0] || 'Sentinel-1C'}
            </Badge>
          </div>
          <CardDescription className="mt-1">
            Simulated C-Band synthetic aperture radar with deep convolutional U-Net inference
          </CardDescription>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowMask(!showMask)}
            className={`h-8 text-xs gap-1.5 ${showMask ? 'border-burgundy-500/40 text-burgundy-400 bg-burgundy-500/10' : ''}`}
          >
            {showMask ? <Eye size={13} /> : <EyeOff size={13} />}
            <span>AI Mask</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowBoundary(!showBoundary)}
            className={`h-8 text-xs gap-1.5 ${showBoundary ? 'border-burgundy-500/40 text-burgundy-400 bg-burgundy-500/10' : ''}`}
          >
            {showBoundary ? <Eye size={13} /> : <EyeOff size={13} />}
            <span>Vector Boundary</span>
          </Button>

          <Button
            size="sm"
            variant="hazard"
            onClick={handleRunDetection}
            disabled={detectionState === 'PROCESSING'}
            className="h-8 text-xs gap-1.5 font-semibold"
          >
            {detectionState === 'PROCESSING' ? (
              <>
                <RefreshCw size={13} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Play size={13} />
                <span>Re-run Inference</span>
              </>
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        {/* Radar Canvas with Overlays */}
        <div className="relative rounded-xl overflow-hidden border border-border bg-card flex items-center justify-center min-h-[360px]">
          <canvas
            ref={canvasRef}
            width={640}
            height={360}
            className="w-full h-auto max-h-[440px] block object-cover"
          />

          {/* Top Left HUD Telemetry */}
          <div className="absolute top-3 left-3 bg-card backdrop-blur-md border border-border rounded-lg p-2.5 text-[11px] font-mono space-y-1 text-secondary-foreground">
            <div className="text-burgundy-400 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-burgundy-400 animate-pulse" />
              SWATH ACQUISITION: {activeIncident?.sarSatellite}
            </div>
            <div>MODE: {activeIncident?.sensorMode}</div>
            <div>POLARIZATION: VV · RESOLUTION: {activeIncident?.resolutionMeters || 10}m</div>
            <div>INCIDENCE ANGLE: 36.4° (Right-Looking)</div>
          </div>

          {/* Bottom Right AI Confidence Badge */}
          <div className="absolute bottom-3 right-3 bg-card backdrop-blur-md border border-border rounded-lg p-2.5 text-[11px] font-mono text-right text-secondary-foreground">
            <div className="text-muted-foreground">DETECTION CONFIDENCE</div>
            <div className="text-silver-400 text-lg font-bold font-mono">
              {activeIncident?.confidence}%
            </div>
            <div className="text-[10px] text-muted-foreground">U-Net v2.4 (Simulated)</div>
          </div>
        </div>

        {/* Progress Bar during simulated processing */}
        {detectionState === 'PROCESSING' && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-burgundy-400">{statusMessage}</span>
              <span className="text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} indicatorClassName="bg-burgundy-500" />
          </div>
        )}

        {/* Morphological Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="p-3 rounded-lg bg-muted border border-border">
            <div className="text-[11px] font-mono text-muted-foreground uppercase">Spill Area</div>
            <div className="text-lg font-bold font-mono text-burgundy-400">
              {activeIncident?.spillAreaKm2} <span className="text-xs font-normal text-muted-foreground">km²</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-muted border border-border">
            <div className="text-[11px] font-mono text-muted-foreground uppercase">Dimensions (L × W)</div>
            <div className="text-lg font-bold font-mono text-foreground">
              {activeIncident?.spillLengthKm} × {activeIncident?.spillWidthKm} <span className="text-xs font-normal text-muted-foreground">km</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-muted border border-border">
            <div className="text-[11px] font-mono text-muted-foreground uppercase">Estimated Volume</div>
            <div className="text-lg font-bold font-mono text-red-700">
              {activeIncident?.estimatedVolumeM3} <span className="text-xs font-normal text-muted-foreground">m³</span>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-muted border border-border">
            <div className="text-[11px] font-mono text-muted-foreground uppercase">Elongation Axis</div>
            <div className="text-lg font-bold font-mono text-silver-400">
              {activeIncident?.orientation}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SARViewer;

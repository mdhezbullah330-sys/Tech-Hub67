import { useEffect, useRef } from "react";

interface Star { x: number; y: number; r: number; a: number; da: number; }
interface EnergyLine {
  x: number; y: number; vx: number; vy: number;
  len: number; alpha: number; hue: number; width: number;
}
interface NebulaOrb { x: number; y: number; r: number; hue: number; phase: number; speed: number; }

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;
    const mouse = { x: -9999, y: -9999 };

    let stars: Star[] = [];
    let energyLines: EnergyLine[] = [];
    let nebulae: NebulaOrb[] = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      init();
    }

    function init() {
      const W = canvas!.width;
      const H = canvas!.height;

      // Stars
      stars = Array.from({ length: 160 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.1 + 0.2,
        a: Math.random(),
        da: (Math.random() - 0.5) * 0.008,
      }));

      // Energy flow lines
      energyLines = Array.from({ length: 22 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        len: Math.random() * 120 + 60,
        alpha: Math.random() * 0.4 + 0.1,
        hue: Math.random() * 60 + 270, // purple to magenta range
        width: Math.random() * 1.2 + 0.3,
      }));

      // Nebula orbs
      nebulae = Array.from({ length: 5 }, (_, i) => ({
        x: (W / 5) * i + Math.random() * (W / 5),
        y: Math.random() * H,
        r: Math.random() * 220 + 140,
        hue: [280, 300, 265, 290, 310][i],
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.004 + 0.002,
      }));
    }

    function drawBackground(W: number, H: number) {
      // Base deep space
      const bg = ctx!.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.8);
      bg.addColorStop(0, "rgba(8, 3, 22, 1)");
      bg.addColorStop(0.5, "rgba(5, 2, 15, 1)");
      bg.addColorStop(1, "rgba(2, 1, 8, 1)");
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, W, H);
    }

    function drawNebulae(W: number, H: number) {
      nebulae.forEach((n) => {
        const px = n.x + Math.sin(t * n.speed + n.phase) * 60;
        const py = n.y + Math.cos(t * n.speed * 0.7 + n.phase) * 40;
        const grad = ctx!.createRadialGradient(px, py, 0, px, py, n.r);
        const alpha = 0.025 + Math.sin(t * n.speed * 2 + n.phase) * 0.01;
        grad.addColorStop(0, `hsla(${n.hue}, 80%, 65%, ${alpha + 0.01})`);
        grad.addColorStop(0.4, `hsla(${n.hue}, 70%, 50%, ${alpha * 0.6})`);
        grad.addColorStop(1, `hsla(${n.hue}, 60%, 40%, 0)`);
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(px, py, n.r, 0, Math.PI * 2);
        ctx!.fill();
      });
    }

    function drawCyberGrid(W: number, H: number) {
      const gridSize = 60;
      ctx!.save();
      ctx!.globalAlpha = 0.045;
      ctx!.strokeStyle = "rgba(190, 80, 255, 1)";
      ctx!.lineWidth = 0.5;

      const offsetX = (t * 0.3) % gridSize;
      const offsetY = (t * 0.15) % gridSize;

      for (let x = -gridSize + offsetX; x < W + gridSize; x += gridSize) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, H);
        ctx!.stroke();
      }
      for (let y = -gridSize + offsetY; y < H + gridSize; y += gridSize) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(W, y);
        ctx!.stroke();
      }
      ctx!.restore();
    }

    function drawStars() {
      stars.forEach((s) => {
        s.a += s.da;
        if (s.a <= 0 || s.a >= 1) s.da = -s.da;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(220, 180, 255, ${Math.abs(s.a)})`;
        ctx!.fill();
      });
    }

    function drawEnergyLines(W: number, H: number) {
      energyLines.forEach((el) => {
        el.x += el.vx;
        el.y += el.vy;
        if (el.x < -el.len) el.x = W + el.len;
        if (el.x > W + el.len) el.x = -el.len;
        if (el.y < -el.len) el.y = H + el.len;
        if (el.y > H + el.len) el.y = -el.len;

        const pulse = Math.sin(t * 0.04 + el.x * 0.01) * 0.5 + 0.5;
        const a = el.alpha * (0.5 + pulse * 0.5);

        const tailX = el.x - el.vx * el.len;
        const tailY = el.y - el.vy * el.len;

        const grad = ctx!.createLinearGradient(tailX, tailY, el.x, el.y);
        grad.addColorStop(0, `hsla(${el.hue}, 90%, 70%, 0)`);
        grad.addColorStop(0.6, `hsla(${el.hue}, 90%, 70%, ${a * 0.4})`);
        grad.addColorStop(1, `hsla(${el.hue}, 90%, 75%, ${a})`);

        ctx!.beginPath();
        ctx!.moveTo(tailX, tailY);
        ctx!.lineTo(el.x, el.y);
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = el.width;
        ctx!.lineCap = "round";
        ctx!.stroke();

        // Bright tip dot
        ctx!.beginPath();
        ctx!.arc(el.x, el.y, el.width * 1.8, 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${el.hue}, 100%, 85%, ${a * 0.7})`;
        ctx!.fill();
      });
    }

    function drawMouseGlow(W: number, H: number) {
      if (mouse.x < 0 || mouse.x > W) return;
      const r = 220;
      const grad = ctx!.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, r);
      grad.addColorStop(0, "rgba(200, 80, 255, 0.055)");
      grad.addColorStop(0.4, "rgba(170, 50, 220, 0.028)");
      grad.addColorStop(1, "rgba(140, 40, 200, 0)");
      ctx!.fillStyle = grad;
      ctx!.beginPath();
      ctx!.arc(mouse.x, mouse.y, r, 0, Math.PI * 2);
      ctx!.fill();
    }

    function animate() {
      t++;
      const W = canvas!.width;
      const H = canvas!.height;

      drawBackground(W, H);
      drawNebulae(W, H);
      drawCyberGrid(W, H);
      drawStars();
      drawEnergyLines(W, H);
      drawMouseGlow(W, H);

      animId = requestAnimationFrame(animate);
    }

    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    resize();
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

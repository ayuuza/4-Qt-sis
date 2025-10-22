import React, { useRef, useState } from 'react';

export default function CardMaker() {
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState('Happy Bhai Dooj');
  const [message, setMessage] = useState('May your bond stay blessed.');
  const [template, setTemplate] = useState('flower');
  const canvasRef = useRef();

  function handleUpload(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(f);
  }

  function renderCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = 1200, H = 1600;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');

    // background
    ctx.fillStyle = template === 'dark' ? '#0b1220' : '#fff7f0';
    ctx.fillRect(0,0,W,H);

    // border
    ctx.lineWidth=16;
    ctx.strokeStyle = template === 'dark' ? '#fce7a9' : '#fbcfe8';
    ctx.strokeRect(28,28,W-56,H-56);

    // photo
    const photoSize = 760;
    const px = (W-photoSize)/2, py = 140;
    if (photo) {
      const img = new Image();
      img.crossOrigin='anonymous';
      img.onload = () => {
        // draw rounded photo
        ctx.save();
        roundRect(ctx, px, py, photoSize, photoSize, 24);
        ctx.clip();
        const scale = Math.max(photoSize/img.width, photoSize/img.height);
        const sw = img.width*scale, sh = img.height*scale;
        ctx.drawImage(img, px + (photoSize-sw)/2, py + (photoSize-sh)/2, sw, sh);
        ctx.restore();
        drawTexts();
      };
      img.src = photo;
    } else {
      ctx.fillStyle = template==='dark' ? '#071028' : '#fff1f2';
      roundRectFill(ctx, px, py, photoSize, photoSize, 24);
      ctx.fillStyle = '#9ca3af';
      ctx.font = '28px Inter, sans-serif';
      ctx.textAlign='center';
      ctx.fillText('Upload photo', W/2, py + photoSize/2);
      drawTexts();
    }

    function drawTexts() {
      // title
      ctx.fillStyle = template==='dark' ? '#fff' : '#111827';
      ctx.font = '56px Georgia, serif';
      ctx.textAlign = 'center';
      wrapText(ctx, title, W/2, 940, W-220, 56);

      // message
      ctx.fillStyle = template==='dark' ? '#d1d5db' : '#374151';
      ctx.font = '28px Inter, sans-serif';
      wrapText(ctx, message, W/2, 1040, W-260, 36);

      // footer
      ctx.font = '18px Inter, sans-serif';
      ctx.fillStyle = template==='dark' ? '#94a3b8' : '#6b7280';
      ctx.fillText('Made with ❤️ — share your card', W/2, H-64);
    }

    function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();}
    function roundRectFill(ctx,x,y,w,h,r){roundRect(ctx,x,y,w,h,r);ctx.fill();}
    function wrapText(ctx,text,x,y,maxWidth,lineHeight){const words=text.split(' ');let line='';let testY=y;for(let n=0;n<words.length;n++){const testLine=line+words[n]+' ';const metrics=ctx.measureText(testLine);if(metrics.width>maxWidth&&n>0){ctx.fillText(line,x,testY);line=words[n]+' ';testY+=lineHeight;}else{line=testLine;}}ctx.fillText(line,x,testY);}

  }

  function downloadPNG() {
    renderCanvas();
    const data = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = data; a.download = 'bhai-dooj-card.png'; a.click();
  }

  return (
    <div className="w-full max-w-5xl mx-auto grid md:grid-cols-2 gap-6 p-6">
      <div className="bg-white rounded-2xl p-6 shadow">
        <h2 className="text-2xl font-semibold">Bhai Dooj Card</h2>
        <p className="text-sm text-gray-500 mb-4">Match UI & behavior from the demo.</p>

        <label className="block mb-3">
          <div className="text-xs text-gray-600 mb-1">Upload photo</div>
          <input type="file" accept="image/*" onChange={handleUpload} />
        </label>

        <label className="block mb-3">
          <div className="text-xs text-gray-600 mb-1">Title</div>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full rounded-md border px-3 py-2" />
        </label>

        <label className="block mb-3">
          <div className="text-xs text-gray-600 mb-1">Message</div>
          <textarea value={message} onChange={(e)=>setMessage(e.target.value)} rows={4} className="w-full rounded-md border px-3 py-2" />
        </label>

        <div className="mb-3">
          <div className="text-xs text-gray-600 mb-1">Template</div>
          <select value={template} onChange={(e)=>setTemplate(e.target.value)} className="rounded-md border px-3 py-2">
            <option value="flower">Flower (light)</option>
            <option value="dark">Elegant (dark)</option>
            <option value="plain">Plain</option>
          </select>
        </div>

        <div className="flex gap-3 mt-4">
          <button onClick={renderCanvas} className="px-4 py-2 rounded bg-indigo-600 text-white">Render</button>
          <button onClick={downloadPNG} className="px-4 py-2 rounded border">Download</button>
          <button onClick={()=>{renderCanvas(); const w=window.open(); w.document.write('<img src="'+canvasRef.current.toDataURL()+'" style="max-width:100%"/>');}} className="px-4 py-2 rounded border">Share preview</button>
        </div>

        <div className="mt-4 text-xs text-gray-500">Tip: For share links you'll need a backend to store images and return short URLs.</div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow flex flex-col items-center">
        <div className="w-full max-w-md rounded-xl p-4">
          <div className="w-full h-96 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
            {photo ? <img src={photo} className="object-cover w-full h-full" alt="preview"/> : <div className="text-gray-400">Preview will appear here</div>}
          </div>
          <div className="mt-4 text-center">
            <div className="font-medium text-lg">{title}</div>
            <div className="text-sm text-gray-600 mt-2">{message}</div>
          </div>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}

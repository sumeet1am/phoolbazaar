import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Trash2, ArrowLeft, ArrowRight, Sparkles, X, Check } from 'lucide-react';

export default function ImageUploader({ images = [], onChange }) {
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Compress raw image to fast JPEG Data URL
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 1000;

          if (width > height && width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          resolve(compressedDataUrl);
        };
      };
    });
  };

  // Handle Gallery Selection
  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const compressedList = await Promise.all(files.map((file) => compressImage(file)));
    onChange([...images, ...compressedList]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Open WebRTC Device Camera
  const startCamera = async () => {
    setShowCameraModal(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      alert('Could not access camera. Please check browser permissions.');
      setShowCameraModal(false);
    }
  };

  // Capture Frame from Video Stream
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 800;
    canvas.height = video.videoHeight || 600;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const photoUrl = canvas.toDataURL('image/jpeg', 0.85);

    onChange([...images, photoUrl]);
    stopCamera();
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setShowCameraModal(false);
  };

  const handleRemoveImage = (index) => {
    onChange(images.filter((_, idx) => idx !== index));
  };

  const handleMoveImage = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= images.length) return;
    const updated = [...images];
    const [moved] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, moved);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Upload action buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={startCamera}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-xs rounded-2xl shadow-bloom flex items-center justify-center gap-2 transition-all"
        >
          <Camera className="w-4 h-4" />
          <span>📸 Open Camera</span>
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 py-3 px-4 bg-white border border-emerald-300 text-emerald-900 font-bold text-xs rounded-2xl hover:bg-emerald-50 shadow-sm flex items-center justify-center gap-2 transition-all"
        >
          <ImageIcon className="w-4 h-4 text-emerald-600" />
          <span>🖼 Choose From Gallery</span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-2">
            <span>Uploaded Product Images ({images.length})</span>
            <span className="text-[10px] text-gray-400">First image will be main display cover</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map((imgUrl, idx) => (
              <div
                key={idx}
                className="relative group aspect-square rounded-2xl overflow-hidden border-2 border-gray-200 bg-gray-50 shadow-sm"
              >
                <img src={imgUrl} alt="" className="w-full h-full object-cover" />

                {/* Primary Cover Badge */}
                {idx === 0 && (
                  <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow">
                    Cover Image
                  </span>
                )}

                {/* Overlay actions */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="self-end p-1.5 bg-rose-500 text-white rounded-full hover:bg-rose-600 shadow"
                    title="Remove Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center justify-between">
                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() => handleMoveImage(idx, idx - 1)}
                        className="p-1 bg-white/80 hover:bg-white text-gray-800 rounded-full"
                        title="Move Left"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {idx < images.length - 1 && (
                      <button
                        type="button"
                        onClick={() => handleMoveImage(idx, idx + 1)}
                        className="p-1 bg-white/80 hover:bg-white text-gray-800 rounded-full ml-auto"
                        title="Move Right"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WebRTC Camera Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
          <div className="bg-white rounded-3xl overflow-hidden max-w-md w-full p-6 space-y-4 text-center relative shadow-2xl">
            <button
              type="button"
              onClick={stopCamera}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-lg text-gray-900">
              📸 Capture Product Photo
            </h3>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={capturePhoto}
                className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold text-xs rounded-2xl shadow-bloom flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>Capture & Save Photo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

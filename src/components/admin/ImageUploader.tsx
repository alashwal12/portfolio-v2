"use client";

import { useState, useRef } from "react";

interface ImageUploaderProps {
  name: string;
  defaultImage?: string;
  isProfile?: boolean;
}

export function ImageUploader({ name, defaultImage, isProfile = false }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | undefined>(defaultImage);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(defaultImage);
      if (hiddenInputRef.current) hiddenInputRef.current.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_SIZE = 800; // Compress image to max 800px to avoid Netlify 6MB limits
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Compress to JPEG with 70% quality (usually < 200KB)
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        setPreview(dataUrl);
        if (hiddenInputRef.current) {
          hiddenInputRef.current.value = dataUrl;
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {preview && (
        <div className="mb-3">
          <img 
            src={preview} 
            alt="Preview" 
            className={isProfile ? "w-20 h-20 rounded-full object-cover border border-gray-200 dark:border-gray-700" : "w-32 h-auto rounded-lg border border-gray-200 dark:border-gray-700 object-cover"} 
          />
        </div>
      )}
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
      />
      <input type="hidden" name={name} ref={hiddenInputRef} />
    </div>
  );
}

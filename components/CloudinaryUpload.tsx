'use client'

import { CldUploadWidget } from 'next-cloudinary'
import { useState } from 'react'
import { Upload, X, Check } from 'lucide-react'
import Image from 'next/image'

interface CloudinaryUploadProps {
  onImageUpload: (imageUrl: string) => void
  placeholder?: string
  currentImage?: string
}

export default function CloudinaryUpload({
  onImageUpload,
  placeholder = 'Sube una imagen',
  currentImage,
}: CloudinaryUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState(currentImage || '')

  const handleUpload = (result: any) => {
    setIsUploading(true)
    
    if (result.event === 'success') {
      const imageUrl = result.info.secure_url
      setUploadedUrl(imageUrl)
      onImageUpload(imageUrl)
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {!uploadedUrl ? (
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={handleUpload}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              disabled={isUploading}
              className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary-500 dark:hover:border-primary-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex flex-col items-center space-y-2">
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Subiendo...
                    </span>
                  </>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {placeholder}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      o arrastra un archivo
                    </span>
                  </>
                )}
              </div>
            </button>
          )}
        </CldUploadWidget>
      ) : (
        <div className="relative space-y-4">
          <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <Image
              src={uploadedUrl}
              alt="Uploaded image"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
            <Check className="w-5 h-5" />
            <span className="text-sm font-medium">Imagen cargada exitosamente</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setUploadedUrl('')
              onImageUpload('')
            }}
            className="w-full flex items-center justify-center space-x-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-medium py-2 rounded-lg transition"
          >
            <X className="w-4 h-4" />
            <span>Cambiar imagen</span>
          </button>
        </div>
      )}
    </div>
  )
}

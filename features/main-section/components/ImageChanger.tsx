import { Image as ImageIcon, UploadCloud } from "lucide-react";

interface ImageChangerProps {
  previewImage: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ImageChanger({ previewImage, onImageChange }: ImageChangerProps) {
  return (
    <div className="flex flex-col gap-3 group col-span-1 md:col-span-2 lg:col-span-3">
      <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 capitalize">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 transition-colors" />
        Main Image
      </label>
      
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="relative w-full md:w-[400px] h-[220px] bg-zinc-50 dark:bg-zinc-900 rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center overflow-hidden group cursor-pointer transition-all hover:border-blue-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/50">
          {previewImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewImage} alt="Main Section" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="flex flex-col items-center text-zinc-400">
              <ImageIcon className="w-10 h-10 mb-3 text-zinc-300 dark:text-zinc-600" />
              <span className="text-sm font-medium">Click to upload</span>
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
            <UploadCloud className="w-8 h-8 text-white mb-2" />
            <span className="text-white text-sm font-medium">Change Image</span>
          </div>
          
          <input 
            type="file" 
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={onImageChange}
          />
        </div>
        
        <div className="flex-1 space-y-3 mt-2 md:mt-6">
          <p className="text-base font-medium text-zinc-700 dark:text-zinc-300">
            Upload a high-quality image to be displayed in the main section.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            It is recommended to use an image with a horizontal aspect ratio (e.g., 16:9) to fit beautifully on all screen sizes. Max file size: 5MB.
          </p>
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold mt-2">
            Local preview only
          </div>
        </div>
      </div>
    </div>
  );
}

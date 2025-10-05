import DottedBackground  from "@/components/ui/dotted-vignette-background";
import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";

const LoadingScreen = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <DottedBackground
          dotColor="#a855f7"
          backgroundColor="#000"
          enableVignette={true}
          vignetteColor="rgba(0,0,0,0.9)"
          enableInnerGlow={true}
          innerGlowColor="rgba(0,0,0,0.8)"
          dotSize={4}
          dotSpacing={10}
       />
        <div className="absolute top-1/2 left-1/2 font-playfair font-bold transform -translate-x-1/2 text-white">
          <AppleHelloEnglishEffect />
        </div>
    </div>
  );
};

export { LoadingScreen };

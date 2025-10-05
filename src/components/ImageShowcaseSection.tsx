// Replaced Spline showcase with a static image


const ImageShowcaseSection = () => {

  // const ROBOT_SCENE_URL was used for Spline; removed in favor of an image
  const ROBOT_ALT_TEXT = "Advanced humanoid robot with orange and white design";

  return (
    <section className="w-full pt-12 pb-8 sm:pb-0 bg-white" id="showcase">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="text-center mb-10 sm:mb-4">
        <div className="flex items-center gap-4 mb-8 sm:mb-4">
          <div className="flex items-center gap-4">
            <div className="pulse-chip">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pulse-500 text-white mr-2">03</span>
              <span>Showcase</span>
            </div>
          </div>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>
          <h2 className="section-title mt-12 mb-3 sm:mb-4 opacity-100 fade-in-element">
            Get Instant Loans, <br className="hidden sm:block" />On Your Terms.
          </h2>
          
        </div>
        
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden  shadow-elegant mx-auto max-w-5xl animate-on-scroll border border-gray-800">
          <div className="w-full bg-black">           
            <img 
              src="/mockups.png" 
              alt={ROBOT_ALT_TEXT}
              className="relative inset-0 z-10 w-full h-full object-cover"
            />
          </div>
          <div className="bg-white p-4 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 sm:mb-4">Next Generation Lending</h3>
            <p className="text-gray-700 text-sm sm:text-base">
             Vault delivers instant loans to students with zero hassle. Using advanced algorithms, your eligibility is determined in by your bank statements and credit profile with no cosigners, just your own merit. Secure, fast and designed to support you every step of your education journey. </p>
            <div className="mt-4">
              <a href="#newsletter" className="button-primary button-animated inline-flex items-center justify-center w-full sm:w-80">
                Join Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageShowcaseSection;


export const Home = () => {
    return (
        <div className="relative min-h-screen bg-zen-deep overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zen-neon/10 blur-[120px] rounded-full" />

            <div className="container mx-auto px-6 pt-32 pb-64 flex flex-col items-center text-center z-10 relative">
                <h1 className="text-white text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-tight">
                    Trouble with money? <br />
                    <span className="text-zen-neon drop-shadow-[0_0_15px_rgba(198,255,94,0.4)]">
                        WealthTracker can help.
                    </span>
                </h1>
                <p className="text-zen-muted text-lg md:text-xl mb-10 max-w-2xl">
                    The modern way to track your finances. Start your free trial and finally get good at money.
                </p>
                <button className="bg-zen-neon text-black font-black px-10 py-4 rounded-xl shadow-neon-glow hover:scale-105 active:scale-95 transition-all duration-200">
                    Start Your Free Trial
                </button>
            </div>

            <div className="absolute bottom-0 w-full leading-0">
                <svg
                    viewBox="0 0 1440 320"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                >
                    <path
                        fill="#1A1A1A"
                        fillOpacity="1"
                        d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,218.7C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96V320H0Z"
                    ></path>
                </svg>
            </div>
        </div>
    );
};
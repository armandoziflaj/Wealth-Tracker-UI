import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-zen-card border-t border-white/5 pt-16 pb-8 mt-auto">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="w-7 h-7 bg-zen-neon rounded shadow-neon-glow flex items-center justify-center">
                                <span className="text-black font-black text-sm">W</span>
                            </div>
                            <span className="text-white font-bold text-lg tracking-tighter">
                                Wealth<span className="text-zen-neon">Tracker</span>
                            </span>
                        </Link>
                        <p className="text-zen-muted max-w-xs text-sm leading-relaxed">
                            Stop being bad at money. Start tracking your wealth with
                            the most modern tool built for the next generation.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Product</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="/" className="text-zen-muted hover:text-zen-neon transition-colors">Features</Link></li>
                            <li><Link to="/" className="text-zen-muted hover:text-zen-neon transition-colors">Security</Link></li>
                            <li><Link to="/" className="text-zen-muted hover:text-zen-neon transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-[0.2em]">Legal</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="/" className="text-zen-muted hover:text-zen-neon transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/" className="text-zen-muted hover:text-zen-neon transition-colors">Terms of Use</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zen-muted text-[10px] uppercase tracking-widest">
                        © {currentYear} WealthTracker. Built for your financial freedom.
                    </p>
                    <div className="flex gap-6">
                        <span className="text-zen-muted text-xs hover:text-zen-neon cursor-pointer transition-all">Twitter</span>
                        <span className="text-zen-muted text-xs hover:text-zen-neon cursor-pointer transition-all">GitHub</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
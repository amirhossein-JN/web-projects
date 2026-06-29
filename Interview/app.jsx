const { useState, useEffect, useRef } = React;

const TEAM_MEMBERS = [
        {
        id: 1,
        color: '#0a1628',
        accent: '#2563eb',
        name: 'امیر علی حبیب‌زاده',
        role: 'توسعه‌دهنده',
        avatar: 'https://i.pravatar.cc/150?img=5',
        bio: `امیر علی حبیب‌زاده، دانش‌آموز با اشتیاق به برنامه‌نویسی و رباتیک. در تیم RoboMatrix نقش فعالی در توسعه نرم‌افزار و یکپارچه‌سازی ماژول‌ها دارد. به یادگیری الگوریتم‌های پیشرفته و بهینه‌سازی کد علاقه‌مند است.`
    },
        {
        id: 2,
        color: '#071220',
        accent: '#0891b2',
        name: 'سروش کیان‌مهر',
        role: 'توسعه‌دهنده',
        avatar: 'https://i.pravatar.cc/150?img=2',
        bio: `محمد سروش کیان‌مهر، دانش‌آموز دبیرستان استعدادهای درخشان (سمپاد) علامه حلی ۷، با ۴ سال سابقه برنامه‌نویسی پایتون. آشنا به C++، HTML، CSS، SQL و کتابخانه‌های NumPy، Pandas و Matplotlib. علاقه‌مند به توسعه نرم‌افزار، تحلیل داده و یادگیری فناوری‌های نوین. همواره در تلاش برای افزایش دانش فنی، کسب تجربه عملی و مشارکت در پروژه‌های خلاقانه و چالش‌برانگیز هستم.`
    },
    {
        id: 3,
        color: '#0d1535',
        accent: '#7c3aed',
        name: 'امیر حسین ابراهیمی',
        role: 'توسعه‌دهنده',
        avatar: 'https://i.scdn.co/image/ab67616d0000b2738fca5256f01de5a5279e096c',
        bio: `امیرحسین ابراهیمی، دانش‌آموز رشته کامپیوتر در دبیرستان استعدادهای درخشان (علامه حلی ۷) با سابقه برنامه‌نویسی، هوش مصنوعی و رباتیک. آشنایی با زبان‌های Python، C++، HTML، CSS و با ابزارهای هوش مصنوعی نیز آشنایی دارد. همواره تلاش کرده‌ام با یادگیری مستمر و انجام پروژه‌های عملی، دانش خود را در حوزه فناوری گسترش دهم. در ابتدای سال تحصیلی با حوزه رباتیک و مسابقات ربوکاپ آشنا شدم و به همراه هم‌تیمی‌هایم، زیر نظر استاد گرامی آقای تولیتی، فعالیت خود را در زمینه طراحی، برنامه‌نویسی و توسعه پروژه‌های مرتبط آغاز کردیم. حاصل این همکاری، مشارکت در آماده‌سازی تیم برای حضور در مسابقات «رسیکو» و کسب تجربه ارزشمند در کار تیمی، حل مسئله و برنامه‌نویسی کاربردی بوده است. علاقه‌مند به یادگیری فناوری‌های نوین، توسعه نرم‌افزار، هوش مصنوعی و شرکت در چالش‌ها و مسابقات علمی هستم.`
    },
    {
        id: 4,
        color: '#051520',
        accent: '#0e7490',
        name: 'محمد پویا اسمعیلی',
        role: 'توسعه‌دهنده',
        avatar: 'https://i.pravatar.cc/150?img=1',
        bio: `محمد پویا اسمعیلی، دانش‌آموز و توسعه‌دهنده علاقه‌مند به حوزه کامپیوتر، هوش مصنوعی و رباتیک، با سابقه کار تخصصی در برنامه‌نویسی فرانت‌اند و بک‌اند (React و Django). در ابتدای سال تحصیلی با حوزه رباتیک و مسابقات ربوکاپ آشنا شدم و به همراه هم‌تیمی‌هایم، زیر نظر استاد گرامی آقای تولیتی، فعالیت خود را در زمینه طراحی، برنامه‌نویسی و توسعه پروژه‌های مرتبط آغاز کردیم. حاصل این همکاری، مشارکت در آماده‌سازی تیم برای حضور در مسابقات «رسیکو» و کسب تجربه ارزشمند در کار تیمی، حل مسئله و برنامه‌نویسی کاربردی بوده است. علاقه‌مند به یادگیری فناوری‌های نوین، توسعه نرم‌افزار، هوش مصنوعی و شرکت در چالش‌ها و مسابقات علمی هستم و همواره به دنبال فرصت‌هایی برای کسب تجربه و ارتقای مهارت‌های تخصصی خود می‌باشم.`
    },
    {
        id: 5,
        color: '#0f1a2e',
        accent: '#1d4ed8',
        name: 'کیان احمدی',
        role: 'توسعه‌دهنده',
        avatar: 'https://i.pravatar.cc/150?img=4',
        bio: `کیان احمدی، دانش‌آموز فعال در حوزه رباتیک و برنامه‌نویسی. با تجربه کار گروهی در پروژه‌های ربوکاپ و علاقه‌مند به یادگیری عمیق‌تر در زمینه هوش مصنوعی و کنترل‌رهای ربات. همواره به دنبال چالش‌های جدید در دنیای فناوری است.`
    },
    {
        id: 6,
        color: '#0a1525',
        accent: '#0369a1',
        name: 'علی شعبانی',
        role: 'توسعه‌دهنده',
        avatar: 'https://i.pravatar.cc/150?img=3',
        bio: `علی شعبانی: دانش‌آموز علامه حلی ۷ رشته ریاضی و زیر مجموعه موسسه RoboMatrix و زیر نظر استاد سید طاها تولیتی در رابطه با لیگ Junior Rescue Simulation آموزش دیده و در تیم Navigation را بر عهده داشته است. او بیشتر با مدل‌های مختلف AI آشنا هست و بخش مپینگ را مسلط است. همچنین پایتون را به صورت سطح متوسط رو به بالا می‌داند. روی بخش مربوط به خود تسلط کامل را دارد. ایشان یک تجربه بسیار خوب و آموزنده را در مسابقات انتخابی کره جنوبی داشتند و به امید مقام‌های بهتر در مسابقات ایران اوپن 2026 شرکت می‌کند.`
    },
   
];

const LOGO_IMG = 'https://robomatrix.online/logomatrix.jpg';

function BackgroundCanvas() {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationId;
        let width, height;
        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', resize);
        resize();
        const particles = [];
        const COUNT = 35;
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 3 + 4;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#9dfa99';
                ctx.shadowColor = '#9dfa99';
                ctx.shadowBlur = 15;
                ctx.fill();
            }
        }
        for (let i = 0; i < COUNT; i++) particles.push(new Particle());
        const drawConnections = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 180) {
                        const opacity = 1 - dist / 180;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(157,250,153,${opacity * 0.4})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        };
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => { p.update(); p.draw(); });
            drawConnections();
            animationId = requestAnimationFrame(animate);
        };
        animate();
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);
    return <canvas ref={canvasRef} id="bg-canvas" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at top, #0b1220, #05060a)',
            zIndex: -1
        }} />;
}


function AnimatedTitle({ text }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(false);
        const t = setTimeout(() => setVisible(true), 30);
        return () => clearTimeout(t);
    }, [text]);

    return (
        <span
            style={{
                display: 'inline-block',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0px)' : 'translateY(60px)',
                transition: visible
                    ? 'opacity 0.15s ease, transform 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    : 'none',
                background: 'linear-gradient(#4cff46, #00c4da)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
            }}
        >
            {text}
        </span>
    );
}

function UserCard({ member, onSelect }) {
    return (
        <div className="user-card" onClick={() => onSelect(member)}>
            <div className="user-card-inner">
                <img src={member.avatar} alt={member.name} />
                <div className="user-info">
                    <p className="username">{member.name}</p>
                    <span className="user_role">.{member.role}</span>
                </div>
            </div>
        </div>
    );
}

function UserDetailModal({ member, onClose }) {
    if (!member) return null;
    return (
        <div className="shadow-modal" onClick={onClose}>
            <div className="modal-box" onClick={e => e.stopPropagation()} style={{
                background: `radial-gradient(ellipse at top right, ${member.color ? member.color + 'ee' : '#0b1220'}, #05060a)`,
                borderColor: member.accent ? member.accent + '55' : 'rgba(157,250,153,0.25)',
                boxShadow: member.accent ? `0 30px 80px rgba(0,0,0,0.7), 0 0 40px ${member.accent}22` : undefined,
            }}>
                <div className="modal-glow-border" style={{
                    '--glow-color': member.accent || '#9dfa99',
                }}>
                    <span className="side-right"></span>
                    <span className="side-left"></span>
                </div>
                <button className="close-btn" onClick={onClose}>×</button>
                <div className="user-card-mini">
                    <img src={member.avatar} alt={member.name} />
                    <div>
                        <p className="username">{member.name}</p>
                        <span className="user_role">.{member.role}</span>
                    </div>
                </div>
                <h3>رزومه</h3>
                <div className="modal-paragraph">{member.bio}</div>
            </div>
        </div>
    );
}

function CodeModal({ code, title, onClose }) {
    const codeRef = useRef(null);

    useEffect(() => {
        if (codeRef.current && window.Prism) {
            window.Prism.highlightElement(codeRef.current);
        }
    }, [code]);

    const handleCopy = () => {
        navigator.clipboard.writeText(code).catch(() => {});
        const btn = document.getElementById('copy-btn-code');
        if (btn) { btn.textContent = '✔ کپی شد'; setTimeout(() => { btn.textContent = '📋 کپی'; }, 1800); }
    };

    return (
        <div className="shadow-modal" onClick={onClose}>
            <div className="code-modal-box" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <div className="code-modal-header">
                    <h3>{title}</h3>
                    <button id="copy-btn-code" className="copy-btn" onClick={handleCopy}>📋 کپی</button>
                </div>
                <div className="code-window">
                    <div className="code-window-bar">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                        <span className="code-lang-label">Python</span>
                    </div>
                    <pre className="code-pre language-python"><code ref={codeRef} className="language-python">{code}</code></pre>
                </div>
            </div>
        </div>
    );
}

function Page1({ members, onSelectMember, currentPage, totalPages, goPrev, goNext }) {
    return (
        <div className="pages-grid">
            <div className="page-header">
                <div className="circle"></div>
                <h1 className="title-style">RoboMatrix</h1>
            </div>
            <div className="page-subtitle">
                 <h3 className="title-style" style={{ fontSize: '30px', margin: 0 }}>
                    <AnimatedTitle text="اعضای تیم " />
                </h3>
            </div>
            {members.map(m => (
                <UserCard key={m.id} member={m} onSelect={onSelectMember} />
            ))}
            <div className="nav-slide">
                <button onClick={goPrev} className="slide-bottom">
                    <span className="span-slide">‹</span>
                </button>
                <span className="page-indicator">صفحه‌ی {currentPage} از {totalPages}</span>
                <button onClick={goNext} className="slide-bottom">
                    <span className="span-slide">›</span>
                </button>
            </div>
        </div>
    );
}

function OtherPages({ children, currentPage, totalPages, goPrev, goNext, pageTitle }) {
    return (
        <div className="pages-grid">
            <div className="page-header">
                <div className="circle"></div>
                <h1 className="title-style">RoboMatrix</h1>
            </div>
            <div className="page-subtitle">
                <strong>{pageTitle}</strong>
            </div>
            <div className="page-content">
                {children}
            </div>
            <div className="nav-slide">
                <button onClick={goPrev} className="slide-bottom">
                    <span className="span-slide">‹</span>
                </button>
                <span className="page-indicator">صفحه‌ی {currentPage} از {totalPages}</span>
                <button onClick={goNext} className="slide-bottom">
                    <span className="span-slide">›</span>
                </button>
            </div>
        </div>
    );
}

function LetterAnimText({ text, className, style }) {
    const words = text.split(' ');
    const total = words.length;
    return (
        <p className={className} style={{ ...style }}>
            {words.map((word, i) => (
                <span
                    key={i}
                    style={{
                        display: 'inline-block',
                        opacity: 0,
                        transform: 'translate(150px, 0) scale(0.3)',
                        animation: `letterIn 0.25s forwards`,
                        animationDelay: `${i * 0.05}s`,
                        marginLeft: '4px',
                    }}
                >
                    {word}
                </span>
            ))}
        </p>
    );
}

function AboutPage() {
    return (
        <div className="div-style">
            <h3 className="title-style" style={{ fontSize: '30px', margin: 0, textAlign: 'center', width: '100%' }}>
                    <AnimatedTitle text="درباره ما" />
                </h3>
            <LetterAnimText
                className="paragraph"
                text="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
            />
        </div>
    );
}

function CodePage({ onShowCode }) {
    const [btnKey, setBtnKey] = useState(0);

    useEffect(() => {
        setBtnKey(k => k + 1);
    }, []);

    return (
        <div className="code-page-content">
            <div className="code-header">
                <h3 className="title-style" style={{ fontSize: '30px', margin: 0 }}>
                    <AnimatedTitle text="کد کنترلر PID" />
                </h3>
                <div
                    key={btnKey}
                    className="code-bottom code-bottom-animated"
                    onClick={onShowCode}
                >
                    <span>دیدن کد</span>
                </div>
            </div>
            <LetterAnimText
                className="paragraph"
                style={{ marginTop: '10px' }}
                text="در این بخش پیاده‌سازی کلاس PID در پایتون نمایش داده شده است. این کنترلر برای ربات‌ها در مسابقات ربوکاپ کاربرد دارد و شامل ضرایب KP، KI و KD می‌باشد. با استفاده از این کلاس می‌توان خطای حرکت را محاسبه و خروجی مناسب برای موتورها تولید کرد."
            />
        </div>
    );
}

function App() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMember, setSelectedMember] = useState(null);
    const [showCodeModal, setShowCodeModal] = useState(false);
    const totalPages = 3;

    const goPrev = () => {
        setCurrentPage(prev => (prev === 1 ? totalPages : prev - 1));
    };
    const goNext = () => {
        setCurrentPage(prev => (prev === totalPages ? 1 : prev + 1));
    };

    const pidCode = `class PID:
    def __init__(self, kp, ki, kd):
        self.kp = kp
        self.ki = ki
        self.kd = kd
        self.integral = 0
        self.previous_error = 0

    def update(self, error, dt):
        self.integral += error * dt
        derivative = (error - self.previous_error) / dt
        output = (
            self.kp * error +
            self.ki * self.integral +
            self.kd * derivative
        )
        self.previous_error = error
        return output`;

    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = drawerOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [drawerOpen]);

    const navigateTo = (page) => {
        setCurrentPage(page);
        setDrawerOpen(false);
    };

    return (
        <>
            <BackgroundCanvas />

            {/* Drawer Overlay */}
            {drawerOpen && (
                <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} />
            )}

            {/* Side Drawer */}
            <div className={`side-drawer ${drawerOpen ? 'drawer-open' : ''}`}>
                <div className="drawer-header">
                    <span className="drawer-title">منو</span>
                    <button className="drawer-close-btn" onClick={() => setDrawerOpen(false)}>×</button>
                </div>
                <nav className="drawer-nav">
                    <a onClick={() => navigateTo(1)} className={currentPage === 1 ? 'active' : ''}>
                        <span className="drawer-nav-icon">👥</span>
                        تیم
                    </a>
                    <a onClick={() => navigateTo(2)} className={currentPage === 2 ? 'active' : ''}>
                        <span className="drawer-nav-icon">ℹ️</span>
                        درباره
                    </a>
                    <a onClick={() => navigateTo(3)} className={currentPage === 3 ? 'active' : ''}>
                        <span className="drawer-nav-icon">💻</span>
                        کد
                    </a>
                </nav>
            </div>

            <header>
                <div className="logo">
                    <img src={LOGO_IMG} alt="RoboMatrix" />
                    <span>RoboMatrix</span>
                </div>
                <div className="header-actions">
                    <button className="hamburger-btn" onClick={() => setDrawerOpen(true)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </header>

            {currentPage === 1 && (
                <Page1
                    members={TEAM_MEMBERS}
                    onSelectMember={setSelectedMember}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    goPrev={goPrev}
                    goNext={goNext}
                />
            )}

            {currentPage === 2 && (
                <OtherPages
                    currentPage={currentPage}
                    totalPages={totalPages}
                    goPrev={goPrev}
                    goNext={goNext}
                >
                    <AboutPage />
                </OtherPages>
            )}

            {currentPage === 3 && (
                <OtherPages
                    currentPage={currentPage}
                    totalPages={totalPages}
                    goPrev={goPrev}
                    goNext={goNext}
                    pageTitle=""
                >
                    <CodePage onShowCode={() => setShowCodeModal(true)} />
                </OtherPages>
            )}

            {selectedMember && (
                <UserDetailModal member={selectedMember} onClose={() => setSelectedMember(null)} />
            )}
            {showCodeModal && (
                <CodeModal code={pidCode} title="کد کنترلر PID" onClose={() => setShowCodeModal(false)} />
            )}
        </>
    );
}

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}
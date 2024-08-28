"use client"
import "./Nav.css";
import Link from 'next/link';

function Nav() {
    return(
        <nav className="nav">
            <div className="nav__container">
                <div className="nav__left">
                    <div>
                        <Link href="/" style={{ color: 'black', textDecoration: 'none' } }>
                            <div className="nav__logo">
                                SNAP
                            </div>
                        </Link>
                    </div>

                    <div >
                        <Link href="/Template" style={{ color: 'black', textDecoration: 'none' }}>
                            Donate
                        </Link>
                    </div>

                    <div >
                        <Link href="/Vote" style={{ color: 'black', textDecoration: 'none' }}>
                            Vote
                        </Link>
                    </div>

                    <div >
                        <Link href="/Bridge" style={{ color: 'black', textDecoration: 'none' }}>
                            Bridge
                        </Link>
                    </div>

                </div>
                <div className="nav__right">
                </div>
            </div>
        </nav>
    )
}

export default Nav;

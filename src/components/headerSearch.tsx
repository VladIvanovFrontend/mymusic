import React from 'react';
import Image from "next/image";
import classes from '@/style/headerSearch.module.css';

const HeaderSearch = () => {
    return (
        <div>
            <header className={classes.header__wrapper}>
                <Image src={'/logo.svg'} alt={'logo'} width={400} height={100} className={classes.header__logo} priority/>
                <nav className={classes.header__navPage}>
                    <button className={classes.header__buttonPage} id={'thisPage'}>
                        Поиск
                    </button>
                    <button className={classes.header__buttonPage}>
                        Избранное
                    </button>
                    <button className={classes.header__buttonPage}>
                        Плейлисты
                    </button>
                </nav>
                <aside className={classes.header__userControls}>
                    <button className={classes.header__buttonControls}>
                        <Image src={'/icon_setting.svg'} alt={'logo'} width={58} height={58}/>
                    </button>
                    <button className={classes.header__buttonControls}>
                        <Image src={'/icon_profile.svg'} alt={'logo'} width={61} height={61}/>
                    </button>
                    <Image src={'/icon_rotate.png'} alt={'rotate'} width={61} height={61} className={classes.header__wrapperRotate}/>
                    <Image src={'/icon_rotate.png'} alt={'rotate'} width={61} height={61} className={classes.header__wrapperRotate}/>
                </aside>
            </header>
        </div>
    );
};

export default HeaderSearch;
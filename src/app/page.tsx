'use client'
import '@/app/globals.css';
import HeaderSearch from "@/components/headerSearch";
import '@/style/searchPanel.module.css'
import SearchPanel from "@/components/searchPanel";
import PlayerBar from "@/components/playerBar";

export default function Home() {
    return (
        <div className={'background'}>
            <div className={'main'}>
                <HeaderSearch />
                <SearchPanel />
            </div>
            <PlayerBar/>
        </div>
    );
}

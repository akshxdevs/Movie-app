import './Intro.css'

export const Intro = () => {
    return(
        <div className="main-contexts">
             <h1 className='main-header'>Download YTS YIFY movies: HD smallest size</h1>
            <h4 className='welcome-text'>Welcome to the official YTS.NZ website. Here you can browse and download YIFY movies in excellent 720p, 1080p, 2160p 4K and 3D quality, all at the smallest file size. YTS Movies Torrents.</h4>
            <a className='link-text'>IMPORTANT - YTS.NZ is the only new official domain for YIFY Movies</a><br />
            <h3 className='popular-text'>⭐Popular Downloads</h3>
            <h3 className='morefeaturred-text'>🛜more featured...</h3>
            <div id='vertical-line'></div>
        </div>
    );
}
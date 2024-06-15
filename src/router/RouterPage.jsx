import * as ReactDom from "react-router-dom";
import React from "react";
import Loading from "../components/loading/Loading";

const RouterPages = React.memo(() => {
   // Components  
   const NewFeedPageChidlen = React.lazy(() => import('../components/Followpage/NewFeedPageChidlen'));
   const SearchPagePlaylist = React.lazy(() => import('../components/SearchPage/SearchPagePlaylist'));
   const HistroryPlayList = React.lazy(() => import('../components/HistoryPage/HistroryPlayList'));
   const SearchPageArtist = React.lazy(() => import('../components/SearchPage/SearchPageArtist'));
   const MyMusicPlayList = React.lazy(() => import('../components/MyMusicPage/MyMusicPlayList'));
   const SearchPageSong = React.lazy(() => import('../components/SearchPage/SearchPageSong'));
   const SearchPageAll = React.lazy(() => import('../components/SearchPage/SearchPageAll'));
   const MyMusicArtis = React.lazy(() => import('../components/MyMusicPage/MyMusicArtis'));
   const HistoryVideo = React.lazy(() => import('../components/HistoryPage/HistoryVideo'));
   const SearchPageMv = React.lazy(() => import('../components/SearchPage/SearchPageMv'));
   const ArtistSingle = React.lazy(() => import('../components/ArtistPage/ArtistSingle'));
   const MyMusicSong = React.lazy(() => import('../components/MyMusicPage/MyMusicSong'));
   const HistorySong = React.lazy(() => import('../components/HistoryPage/HistorySong'));
   const HubDetailPage = React.lazy(() => import('../components/HubPage/HubDetailPage'));
   const ArtistAlbum = React.lazy(() => import('../components/ArtistPage/ArtistAlbum'));
   const MyMusicAll = React.lazy(() => import('../components/MyMusicPage/MyMusicAll'));
   const MyInfoPage = React.lazy(() => import('../components/MyMusicPage/MyInfoPage'));
   const ArtistSong = React.lazy(() => import('../components/ArtistPage/ArtistSong'));
   const ArtistALl = React.lazy(() => import('../components/ArtistPage/ArtistALl'));
   const MvPageList = React.lazy(() => import('../components/MVpage/MvPageList'));
   const ArtistMv = React.lazy(() => import('../components/ArtistPage/ArtistMv'));
   // pages
   const AuthenticationPage = React.lazy(() => import('../pages/AuthenticationPage'));
   const ZingChartPage = React.lazy(() => import('../pages/ZingChartPage'));
   const NewMusicPage = React.lazy(() => import('../pages/NewMusicPage'));
   const NewFeedPage = React.lazy(() => import('../pages/NewFeedPage'));
   const MyMusicPage = React.lazy(() => import('../pages/MyMusicPage'));
   const HistoryPage = React.lazy(() => import('../pages/HistoryPage'));
   const ArtistPage = React.lazy(() => import('../pages/ArtistPage'));
   const VideoPopUp = React.lazy(() => import('../pages/VideoPopUp'));
   const Top100Page = React.lazy(() => import('../pages/Top100Page'));
   const SearchPage = React.lazy(() => import('../pages/SearchPage'));
   const AlbumPage = React.lazy(() => import('../pages/AlbumPage'));
   const RadioPage = React.lazy(() => import('../pages/RadioPage'));
   const HomePages = React.lazy(() => import('../pages/HomePage'));
   const NotFound = React.lazy(() => import('../pages/NotFound'));
   const HubPage = React.lazy(() => import('../pages/HubPage'));
   const Profile = React.lazy(() => import('../pages/Profile'));
   const MvPage = React.lazy(() => import('../pages/MvPage'));
   // thiếp lập các routes tương ứng
   const routes = [
      { path: "/", element: <HomePages /> },
      { path: "/auth", element: <AuthenticationPage /> },
      { path: "/zing-chart", element: <ZingChartPage /> },
      { path: "/radio", element: <RadioPage /> },
      {
         path: "/mymusic/",
         element: <MyMusicPage />,
         children: [
            { path: "playlist", element: <MyMusicPlayList /> },
            { path: "nghe-si", element: <MyMusicArtis /> },
            { path: "song", element: <MyMusicSong /> },
            { path: "info", element: <MyInfoPage /> },
            { index: true, element: <MyMusicAll /> },
         ],
      },
      {
         path: "newfeed/:nation",
         element: <NewFeedPage />,
         children: [
            { path: ":id", element: <NewFeedPageChidlen /> }
         ],
      },
      { path: "/moi-phat-hanh", element: <NewMusicPage /> },
      { path: "/hub/", element: <HubPage /> },
      { path: "/hub/detail/:id", element: <HubDetailPage /> },
      { path: "/top100", element: <Top100Page /> },
      {
         path: "/mv",
         element: <MvPage />,
         children: [{ path: ":id", element: <MvPageList /> }],
      },
      {
         path: "/tim-kiem",
         element: <SearchPage />,
         children: [
            { path: "tatca/:id", element: <SearchPageAll /> },
            { path: "baihat/:id", element: <SearchPageSong /> },
            { path: "artist/:id", element: <SearchPageArtist /> },
            { path: "video/:id", element: <SearchPageMv /> },
            { path: "playlist/:id", element: <SearchPagePlaylist /> },
         ],
      },
      {
         path: "/nghe-si/:name",
         element: <ArtistPage />,
         children: [
            { index: true, element: <ArtistALl /> },
            { path: "song", element: <ArtistSong /> },
            { path: "album", element: <ArtistAlbum /> },
            { path: "mv", element: <ArtistMv /> },
            { path: "single", element: <ArtistSingle /> },
         ],
      },
      {
         path: "/history/",
         element: <HistoryPage />,
         children: [
            { index: true, path: "playlist", element: <HistroryPlayList /> },
            { path: "video", element: <HistoryVideo /> },
            { path: "song", element: <HistorySong /> },
         ],
      },
      { path: "/video-clip/:id", element: <VideoPopUp /> },
      { path: "/album/:id", element: <AlbumPage /> },
      { path: "/profile", element: <Profile /> },
      { path: "*", element: <NotFound /> },
   ];
   // Lấy thông tin về vị trí (location) của trang
   const location = ReactDom.useLocation();
   // Ref cho phần tử chính của trang
   const mainPageRef = React.useRef();
   // Sử dụng useEffect để theo dõi sự kiện cuộn và thêm/xóa class tùy thuộc vào vị trí cuộn
   React.useEffect(() => {
      mainPageRef.current.addEventListener("scroll", () => {
         if (mainPageRef.current.scrollTop > 30) {
            document.documentElement.classList.add("is-scroll");
         } else {
            document.documentElement.classList.remove("is-scroll");
         };
      });
   }, []);
   // Render các nội dung chính
   return (
      <div ref={mainPageRef} id="scrollableDiv" className="main-page">
         <div className="container">
            <ReactDom.Routes location={location} key={location.pathname}>
               <ReactDom.Route element={<Loading />}>
                  {routes.map((route, index) => (
                     <ReactDom.Route key={index} path={route.path} element={route.element}>
                        {route.children && route.children.map((child, childIndex) => (
                           <ReactDom.Route key={childIndex} index={child.index} path={child.path} element={child.element} />
                        ))}
                     </ReactDom.Route>
                  ))}
               </ReactDom.Route>
            </ReactDom.Routes>
         </div>
      </div>
   );
});

export default RouterPages;
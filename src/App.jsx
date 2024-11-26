import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import s from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import logoImg from "./assets/images/logo.png";
import { Logo } from "./components/Logo/Logo";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";

export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendationList, setRecommendationList] = useState([]);

  async function fetchPopulars() {
    const popularTVShowList = await TVShowAPI.fetchPopulars();
    if (popularTVShowList && popularTVShowList.length > 0) {
      console.log(popularTVShowList);
      setCurrentTVShow(popularTVShowList[0]);
    }
  }

  async function fetchRecommendations(id) {
    const recommendationListResp = await TVShowAPI.fetchRecommendations(id);
    if (recommendationListResp && recommendationListResp.length > 0) {
      setRecommendationList(recommendationListResp.slice(0, 10));
    }
  }

  async function fetchByTitle(title) {
    const searchList = await TVShowAPI.fetchByTitle(title);
    if (searchList.length > 0) {
      setCurrentTVShow(searchList[0]);
    }
  }

  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    if (currentTVShow) {
      console.log("Current TV show Id: ", currentTVShow.id);
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]);

  function UpdateCurrentTVShow(tvShow) {
    setCurrentTVShow(tvShow);
  }

  console.log(currentTVShow);
  console.log(recommendationList);

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
           url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo
              image={logoImg}
              title="watowatch"
              subtitle={"Find the show you may like"}
            />
          </div>
          <div className="col-md-12 col-lg-4">
            <SearchBar onSubmit={fetchByTitle} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_details}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommended_shows}>
        {currentTVShow && (
          <TVShowList
            onClickItem={UpdateCurrentTVShow}
            tvShowList={recommendationList}
          />
        )}
      </div>
    </div>
  );
}

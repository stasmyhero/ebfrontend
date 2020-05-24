<template>
  <div class="search-results-grid">
    <div class="clear-item-cont on-desktop-and-tablet" />
    <div class="news-item-wrapper">
      <a class="news-item" href="/news-item.html">
        <div class="news-item-ill-cont">
          <div class="item-ill-gradient-wrapper">
            <div class="item-ill-gradient" />
            <img class="news-item-ill" src="/images/news-ill-1.png" />
          </div>
        </div>
        <div class="news-item-info-wrapper">
          <div class="rubric-title-wrapper">
            <span class="rubric-title">Новости</span>
          </div>
          <div class="news-item-header-and-date-wrapper">
            <div class="news-item-header-cont">
              <span class="news-item-header">Заголовок новости</span>
              <span class="news-item-subheader">Подзаголовок-подзаголовок</span>
            </div>
            <div class="publication-date">Час назад</div>
          </div>
        </div>
      </a>
    </div>
    <div class="news-item-wrapper">
      <a class="news-item" href="/news-item.html">
        <div class="news-item-info-wrapper">
          <div class="rubric-title-wrapper">
            <span class="rubric-title">Новости</span>
          </div>
          <div class="news-item-header-and-date-wrapper">
            <div class="news-item-header-cont">
              <span class="news-item-header">Заголовок новости</span>
              <span class="news-item-subheader">Подзаголовок-подзаголовок</span>
            </div>
            <div class="publication-date">2 часа назад</div>
          </div>
        </div>
      </a>
    </div>
    <div class="news-item-wrapper">
      <a class="news-item" href="/news-item.html">
        <div class="news-item-info-wrapper">
          <div class="rubric-title-wrapper">
            <span class="rubric-title">Новости</span>
          </div>
          <div class="news-item-header-and-date-wrapper">
            <div class="news-item-header-cont">
              <span class="news-item-header">Заголовок новости</span>
              <span class="news-item-subheader">Подзаголовок-подзаголовок</span>
            </div>
            <div class="publication-date">3 часа назад</div>
          </div>
        </div>
      </a>
    </div>
    <div class="article-item-wrapper">
      <a class="article-item rubric-5" href="/article-item.html">
        <div class="article-item-ill-cont">
          <div class="item-ill-gradient-wrapper">
            <div class="item-ill-gradient" />
            <img class="article-item-ill" src="/images/article-ill-1.png" />
          </div>
        </div>
        <div class="article-item-info-wrapper">
          <div class="rubric-title-wrapper">
            <span class="rubric-title">Аналитика</span>
          </div>
          <div class="article-item-header-and-date-wrapper">
            <div class="article-item-header-cont">
              <span class="article-item-header">Заголовок статьи</span>
              <span class="article-item-subheader">Подзаголовок-подзаголовок</span>
            </div>
            <div class="publication-date">4 часа назад</div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SearchWindow',
  data() {
    return {
      results: []
    }
  }
}
</script>

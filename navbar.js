// navbar.js
const headerHTML = `
<header>
  <h2>可莉兒 Hair Salon</h2>
  <nav>
    <ul>
      <li><a href="index.html">首頁</a></li>
      <li><a href="about.html">關於我們</a></li>
      <li><a href="services.html">服務項目</a></li>
      <li><a href="pricing.html">價目表</a></li>
      <li><a href="booking.html">預約</a></li>
      <li><a href="news.html">最新消息</a></li>
      <li><a href="products.html">熱銷產品</a></li>
      <li><a href="contact.html">聯絡我們</a></li>
    </ul>
  </nav>
</header>
`;

// 把這段 HTML 塞進網頁中預留的位子
document.getElementById('navbar-placeholder').innerHTML = headerHTML;

// 自動判斷現在在哪一頁，幫那個按鈕加上 active (亮起) 的效果
const links = document.querySelectorAll('nav a');
const currentUrl = window.location.href;

links.forEach(link => {
  // 如果網址包含這個連結的 href，就把它設為 active
  if (currentUrl.includes(link.getAttribute('href'))) {
    link.classList.add('active');
  }
});
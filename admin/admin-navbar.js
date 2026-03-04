// 1. 產生導航列
const adminHeaderHTML = `
<header>
  <h1>可莉兒 Hair Salon - 管理後台</h1>
  <nav>
    <ul>
      <li><a href="admin-calendar.html">行事曆管理</a></li>
      <li><a href="admin-news.html">公告管理</a></li>
      <li><a href="admin-message.html">留言管理</a></li>
      <li><a href="admin-product.html">產品上架</a></li>
    </ul>
  </nav>
</header>
`;
document.getElementById('admin-navbar-placeholder').innerHTML = adminHeaderHTML;

// 2. 設定 active 狀態
const adminLinks = document.querySelectorAll('nav a');
const adminCurrentUrl = window.location.href;
adminLinks.forEach(link => {
  if (adminCurrentUrl.includes(link.getAttribute('href'))) {
    link.classList.add('active');
  }
});

// ==========================================
// 3. 統一登入鎖定功能 (Session 驗證機制)
// ==========================================
const ADMIN_PASSWORD = "clear0921"; // 你的後台密碼

// 檢查是否已經解鎖 (sessionStorage 在網頁分頁關閉後會自動清除)
if (sessionStorage.getItem('adminAuth') !== 'true') {
  
  // 建立全螢幕遮罩，把後台內容擋住
  const overlay = document.createElement('div');
  overlay.id = 'global-login-overlay';
  overlay.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:#f7fff7; z-index:99999; display:flex; justify-content:center; align-items:center;';
  
  overlay.innerHTML = `
    <div style="background:#fff; padding:30px 20px; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.15); text-align:center; width: 85%; max-width: 320px;">
        <h2 style="color:#4a7c53; margin-top:0; margin-bottom: 20px; font-size: 22px;">🔒 後台解鎖</h2>
        <input type="password" id="global-admin-pwd" placeholder="請輸入管理密碼" style="padding:12px; margin-bottom:20px; width:100%; box-sizing:border-box; border:1px solid #ddd; border-radius:6px; font-size:16px; text-align:center;">
        <button id="global-login-btn" style="background:#4a7c53; color:#fff; border:none; padding:12px 20px; border-radius:6px; cursor:pointer; width:100%; font-size:16px; font-weight:bold; transition: background 0.3s;">解鎖進入</button>
    </div>
  `;
  document.body.appendChild(overlay);
  
  // 隱藏捲軸，防止在輸入密碼前偷滑看內容
  document.body.style.overflow = 'hidden'; 

  const pwdInput = document.getElementById('global-admin-pwd');
  const loginBtn = document.getElementById('global-login-btn');

  // 驗證密碼的動作
  const checkLogin = () => {
    if (pwdInput.value === ADMIN_PASSWORD) {
        sessionStorage.setItem('adminAuth', 'true'); // 記錄為已解鎖
        document.body.removeChild(overlay);          // 移除遮罩
        document.body.style.overflow = '';           // 恢復捲軸
    } else {
        alert('❌ 密碼錯誤！');
        pwdInput.value = '';
    }
  };

  // 點擊按鈕或按 Enter 鍵都可以解鎖
  loginBtn.addEventListener('click', checkLogin);
  pwdInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkLogin(); 
  });
}
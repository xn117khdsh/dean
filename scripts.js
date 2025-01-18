// Hàm tải tin tức cho các thể loại khác nhau
function loadNews(category) {
    const newsContainer = document.getElementById('news-container');
    
    // Map giữa thể loại và URL API tương ứng
    const apiUrls = {
        top: 'https://newsdata.io/api/1/latest?country=vi&category=top&apikey=pub_64816944f84e7d32f428b852ccd4b19537083',
        technology: 'https://newsdata.io/api/1/latest?country=vi&language=vi&category=technology&apikey=pub_6502717e2e28fe896f0986c1af15d12a78176',
        sports: 'https://newsdata.io/api/1/latest?country=vi&language=vi&category=sports&apikey=pub_6502717e2e28fe896f0986c1af15d12a78176',
        entertainment: 'https://newsdata.io/api/1/latest?country=vi&language=vi&category=entertainment&apikey=pub_65028445f897d77ace2d988c2b998727da9c4',
        business: 'https://newsdata.io/api/1/latest?country=vi&language=vi&category=business&apikey=pub_65028445f897d77ace2d988c2b998727da9c4',
        health: 'https://newsdata.io/api/1/latest?country=vi&language=vi&category=health&apikey=pub_65028445f897d77ace2d988c2b998727da9c4',
    };

    // Lấy URL API dựa trên thể loại
    const apiUrl = apiUrls[category];

    if (!apiUrl) {
        newsContainer.innerHTML = `<p>Không tìm thấy dữ liệu cho thể loại "${category}".</p>`;
        return;
    }

    // Xóa nội dung cũ và hiển thị thông báo tải
    newsContainer.innerHTML = '<p>Đang tải tin tức...</p>';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            newsContainer.innerHTML = ''; // Xóa thông báo đang tải
        
            if (data.results && data.results.length > 0) {
                data.results.forEach(article => {
                    const newsArticle = document.createElement('div');
                    newsArticle.classList.add('news-article');
        
                    // Thêm tên nguồn tin vào phần tin tức
                    const sourceNameHTML = article.source_name ? `
                        <p class="source-name">Nguồn tin gốc: ${article.source_name}</p>
                    ` : '';
        
                    newsArticle.innerHTML = `
                        <h2>${article.title}</h2>
                        <p>${article.description || 'Không có mô tả.'}</p>
                        ${article.image_url ? `<img src="${article.image_url}" alt="${article.title}">` : ''}
                        ${sourceNameHTML} <!-- Hiển thị nguồn tin gốc -->
                        <a href="${article.link}" target="_blank">Đọc thêm</a>
                    `;
        
                    newsContainer.appendChild(newsArticle);
                });
            } else {
                newsContainer.innerHTML = '<p>Không có bài viết nào trong thể loại này.</p>';
            }
        })
          
}

// Sự kiện tìm kiếm
document.getElementById("search-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn form tải lại trang
    
    const query = document.getElementById("search-input").value.trim();
    
    if (!query) {
        alert("Vui lòng nhập từ khóa tìm kiếm.");
        return;
    }

    // Gọi API tìm kiếm
    searchNews(query);
});

// Hàm tìm kiếm tin tức
function searchNews(query) {
    const apiKey = 'pub_6502717e2e28fe896f0986c1af15d12a78176'; // Thay bằng API key của bạn
    const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(query)}&language=vi`;

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '<p>Đang tìm kiếm...</p>'; // Hiển thị thông báo đang tải

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            newsContainer.innerHTML = ''; // Xóa thông báo đang tải
            
            if (data.results && data.results.length > 0) {
                // Hiển thị kết quả tìm kiếm
                data.results.forEach(article => {
                    const newsArticle = document.createElement('div');
                    newsArticle.classList.add('news-article');

                    newsArticle.innerHTML = `
                        <h2>${article.title}</h2>
                        <p>${article.description || 'Không có mô tả.'}</p>
                        ${article.image_url ? `<img src="${article.image_url}" alt="${article.title}">` : ''}
                        <p class="source-name">Nguồn: ${article.source_name || 'Không rõ'}</p>
                        <a href="${article.link}" target="_blank">Đọc thêm</a>
                    `;

                    newsContainer.appendChild(newsArticle);
                });
            } else {
                newsContainer.innerHTML = '<p>Không tìm thấy kết quả nào phù hợp.</p>';
            }
        })
        .catch(error => {
            console.error('Lỗi khi tìm kiếm:', error);
            newsContainer.innerHTML = '<p>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>';
        });
}

// Cập nhật thời tiết (giả lập)
function loadWeather() {
    const weatherWidget = document.querySelector('.widget:first-child');
    weatherWidget.innerHTML = `
        <h2>Thời tiết</h2>
        <p>Hà Nội: 22°C, Mưa</p>
        <p>TP.HCM: 31°C, Nắng</p>
    `;
}

// Cập nhật kết quả xổ số (giả lập)
function loadLottery() {
    const lotteryWidget = document.querySelector('.widget:nth-child(2)');
    lotteryWidget.innerHTML = `
        <h2>Kết quả xổ số</h2>
        <ul>
            <li>Miền Bắc: 56789</li>
            <li>Miền Trung: 12345</li>
            <li>Miền Nam: 98765</li>
        </ul>
    `;
}

// Hàm lấy 3 bài viết ngẫu nhiên cho phần bài viết nổi bật
function loadFeaturedArticles() {
    const featuredWidget = document.querySelector('.widget:nth-child(3) ul');
    const apiUrl = 'https://newsdata.io/api/1/latest?country=vi&language=vi&apikey=pub_65028445f897d77ace2d988c2b998727da9c4';

    // Hiển thị thông báo đang tải
    featuredWidget.innerHTML = '<li>Đang tải bài viết nổi bật...</li>';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.results && data.results.length > 0) {
                // Lấy 3 bài viết ngẫu nhiên
                const randomArticles = data.results.sort(() => 0.5 - Math.random()).slice(0, 3);
                featuredWidget.innerHTML = ''; // Xóa nội dung cũ

                randomArticles.forEach(article => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<a href="${article.link}" target="_blank">${article.title}</a>`;
                    featuredWidget.appendChild(listItem);
                });
            } else {
                featuredWidget.innerHTML = '<li>Không có bài viết nổi bật nào.</li>';
            }
        })
        .catch(error => {
            featuredWidget.innerHTML = '<li>Lỗi khi tải bài viết nổi bật.</li>';
            console.error('Error loading featured articles:', error);
        });
}

// Gọi hàm này khi tải trang
loadFeaturedArticles();
// Thêm logic hiển thị widget dựa trên kích thước màn hình
function showWidgetsOnMobile() {
    const rightColumn = document.querySelector('.right-column');
    const widgets = rightColumn.querySelectorAll('.widget');

    // Ẩn tất cả widget trước
    widgets.forEach(widget => widget.style.display = 'none');

    // Hiển thị lại các widget cụ thể (ví dụ: thời tiết và bài viết nổi bật)
    if (window.innerWidth <= 768) {
        widgets[0].style.display = 'block'; // Thời tiết
        widgets[2].style.display = 'block'; // Bài viết nổi bật
    } else {
        widgets.forEach(widget => widget.style.display = 'block'); // Hiển thị tất cả trên màn hình lớn
    }
}

// Lắng nghe sự thay đổi kích thước cửa sổ
window.addEventListener('resize', showWidgetsOnMobile);
showWidgetsOnMobile(); // Gọi hàm khi trang tải

// Gọi các hàm này khi tải trang
loadWeather();
loadLottery();

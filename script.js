// محصولات نمونه
const products = [
    {
      id: 1,
      name: "هدفون بی‌سیم حرفه‌ای",
      price: 1200000,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      category: "دیجیتال",
      description: "هدفون بی‌سیم با کیفیت صدای عالی و باتری قوی."
    },
    {
      id: 2,
      name: "ساعت هوشمند",
      price: 950000,
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      category: "دیجیتال",
      description: "ساعت هوشمند با امکانات متنوع و طراحی شیک."
    },
    {
      id: 3,
      name: "کفش ورزشی مردانه",
      price: 780000,
      image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c",
      category: "پوشاک",
      description: "کفش راحت و مناسب برای ورزش و پیاده‌روی."
    },
    {
      id: 4,
      name: "کتاب روانشناسی",
      price: 120000,
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
      category: "کتاب",
      description: "کتاب پرفروش با موضوع موفقیت و رشد فردی."
    },
    {
      id: 5,
      name: "عینک آفتابی",
      price: 340000,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      category: "اکسسوری",
      description: "عینک آفتابی با فریم سبک و شیشه UV."
    }
  ];
  
  // نمایش دسته‌بندی‌ها
  function renderCategories() {
    const cats = [...new Set(products.map(p => p.category))];
    const categoriesDiv = document.getElementById('categories');
    categoriesDiv.innerHTML = `<button class="category-btn active" onclick="filterProducts('همه')">همه</button>`;
    cats.forEach(cat => {
      categoriesDiv.innerHTML += `<button class="category-btn" onclick="filterProducts('${cat}')">${cat}</button>`;
    });
  }
  renderCategories();
  
  // نمایش محصولات
  function renderProducts(list = products) {
    const productsDiv = document.getElementById('products');
    if (list.length === 0) {
      productsDiv.innerHTML = `<div class="alert">محصولی یافت نشد.</div>`;
      return;
    }
    productsDiv.innerHTML = '';
    list.forEach(p => {
      productsDiv.innerHTML += `
        <div class="product-card">
          <img src="${p.image}" alt="${p.name}">
          <h4>${p.name}</h4>
          <p>${p.description}</p>
          <div class="price">${p.price.toLocaleString()} تومان</div>
          <button onclick="addToCart(${p.id})"><i class="bi bi-cart-plus"></i> افزودن به سبد</button>
        </div>
      `;
    });
  }
  renderProducts();
  
  // فیلتر محصولات بر اساس دسته‌بندی
  function filterProducts(cat) {
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    if (cat === 'همه') {
      renderProducts(products);
      document.querySelector('.category-btn').classList.add('active');
    } else {
      renderProducts(products.filter(p => p.category === cat));
      document.querySelectorAll('.category-btn').forEach(btn => {
        if (btn.textContent === cat) btn.classList.add('active');
      });
    }
  }
  
  // جستجوی محصولات
  document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const q = document.getElementById('searchInput').value.trim();
    if (!q) {
      renderProducts(products);
      return;
    }
    const results = products.filter(p => p.name.includes(q) || p.description.includes(q));
    renderProducts(results);
  });
  
  // سبد خرید
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
  }
  updateCartCount();
  
  function addToCart(id) {
    if (!cart.includes(id)) {
      cart.push(id);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      showCart();
    }
  }
  
  function removeFromCart(id) {
    cart = cart.filter(item => item !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCart();
  }
  
  function showCart() {
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(id => {
      const p = products.find(x => x.id === id);
      if (p) {
        total += p.price;
        cartItems.innerHTML += `
          <li>
            <img src="${p.image}" alt="">
            <span>${p.name}</span>
            <span>${p.price.toLocaleString()} تومان</span>
            <button onclick="removeFromCart(${p.id})" style="background:#ff5252;color:#fff;border:none;border-radius:5px;padding:2px 8px;cursor:pointer;">حذف</button>
          </li>
        `;
      }
    });
    cartTotal.textContent = total.toLocaleString();
    cartModal.classList.add('active');
  }
  function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal.classList.contains('active')) {
      cartModal.classList.remove('active');
    } else {
      showCart();
    }
  }
  function checkout() {
    if (cart.length === 0) {
      alert('سبد خرید شما خالی است!');
      return;
    }
    alert('پرداخت با موفقیت انجام شد! (شبیه‌سازی)');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    toggleCart();
  }
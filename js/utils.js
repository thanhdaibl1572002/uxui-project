export const getLanguageData = async () => {
  const language = localStorage.getItem("language") || "vi";
  let languageData;
  switch (language) {
    case "vi":
      languageData = await fetch("../data/languages/vi.json")
        .then(response => response.json());
      break;
    case "en":
      languageData = await fetch("../data/languages/en.json")
        .then(response => response.json());
      break;
    case "zh":
      languageData = await fetch("../data/languages/zh.json")
        .then(response => response.json());
      break;
    default:
      languageData = {};
  }
  return languageData;
}

export const getProducts = async () => {
  const language = localStorage.getItem("language") || "vi";
  let products;
  switch (language) {
    case "vi":
      products = await fetch("../data/products/products_vi.json")
        .then(response => response.json());
      break;
    case "en":
      products = await fetch("../data/products/products_en.json")
        .then(response => response.json());
      break;
    case "zh":
      products = await fetch("../data/products/products_zh.json")
        .then(response => response.json());
      break;
    default:
      products = [];
  }
  return products;
}

export const getUniqueRam = async () => {
  const products = await getProducts();
  const uniqueRam = Array.from(new Set(products.map(product => product.ram)));
  return uniqueRam.sort((a, b) => a - b);
}

export const getUniqueRom = async () => {
  const products = await getProducts();
  const uniqueRom = Array.from(new Set(products.map(product => product.rom)));
  return uniqueRom.sort((a, b) => a - b);
}

export const getUniqueOS = async () => {
  const products = await getProducts();
  const uniqueOS = Array.from(new Set(products.map(product => product.operatingSystem)));
  return uniqueOS;
}

export const getMaxPrice = async () => {
  const products = await getProducts();
  const prices = products.map(product => product.price);
  return Math.max(...prices);
}

export const getMinPrice = async () => {
  const products = await getProducts();
  const prices = products.map(product => product.price);
  return Math.min(...prices);
}

export const roundUp = (number) => {
  let roundedNumber = Math.ceil(number);
  let digitCount = roundedNumber.toString().length;
  let firstDigit = parseInt(roundedNumber.toString()[0]) + 1;
  let result = firstDigit.toString() + '0'.repeat(digitCount - 1);
  return parseInt(result);
}

export const createStarRatingHTML = (rating) => {
  let html = '';
  const fullStars = Math.floor(rating);
  const halfStars = Math.round(rating - fullStars);
  for (let i = 0; i < fullStars; i++) {
    html += '<i class="fa-solid fa-star"></i>';
  }
  if (halfStars == 1) {
    html += '<i class="fa-solid fa-star-half-stroke"></i>';
  }
  const emptyStars = 5 - (fullStars + halfStars);
  for (let i = 0; i < emptyStars; i++) {
    html += '<i class="fa-regular fa-star"></i>';
  }
  return html;
}

export const formatPrice = (price, discount) => {
  const language = localStorage.getItem("language") || "vi";
  const result = price - (price * discount / 100);
  if (language === "vi") {
    const formattedPrice = result.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    return formattedPrice;
  }
  else if (language === "en") {
    const formattedPrice = result.toLocaleString("en-US", { style: "currency", currency: "USD" });
    return formattedPrice;
  }
  else if (language === "zh") {
    const formattedPrice = result.toLocaleString("zh-CN", { style: "currency", currency: "CNY" });
    return formattedPrice;
  }
};

export const validateEmpty = (string) => {
  return string.trim().length > 0;
}

export const validateName = (name) => {
  const regex = /^[\p{L}\s'-]{2,100}$/u;
  return regex.test(name);
}

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,70}$/;
  return regex.test(email);
}

export const validatePhoneNumber = (phone) => {
  const regex = /^[0-9]{8,9}$/;
  return regex.test(phone);
}

export const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

export const validateConfirmPassword = (password, confirmPassword) => {
  return password.trim().length > 0 && password === confirmPassword;
}

export const filterProducts = async (filterConditions, sortCondition, startIndex, endIndex) => {
  const products = await getProducts();
  const filteredProducts = products.filter(product => {
      let meetsConditions = true;
      if (filterConditions.usageNeeds && !product.usageNeeds.includes(filterConditions.usageNeeds)) {
          meetsConditions = false;
      }
      if (filterConditions.ram && product.ram !== filterConditions.ram) {
          meetsConditions = false;
      }
      if (filterConditions.rom && product.rom !== filterConditions.rom) {
          meetsConditions = false;
      }
      if (filterConditions.screenSize) {
          if (filterConditions.screenSize === 'under-6' && product.screenSize >= 6) {
          meetsConditions = false;
          } else if (filterConditions.screenSize === 'is-6' && product.screenSize !== 6) {
          meetsConditions = false;
          } else if (filterConditions.screenSize === 'over-6' && product.screenSize <= 6) {
          meetsConditions = false;
          }
      }
      if (filterConditions.operatingSystem && product.operatingSystem !== filterConditions.operatingSystem) {
          meetsConditions = false;
      }
      if (filterConditions.minPrice && (product.price - (product.price * product.discount / 100)) < filterConditions.minPrice) {
          meetsConditions = false;
      }
      if (filterConditions.maxPrice && (product.price - (product.price * product.discount / 100)) > filterConditions.maxPrice) {
          meetsConditions = false;
      }
      if (filterConditions.other) {
          if (filterConditions.other === 'discount' && product.discount <= 0) {
          meetsConditions = false;
          }
          if (filterConditions.other === 'highrating' && product.rating < 4) {
          meetsConditions = false;
          }
          if (filterConditions.other === 'authentic' && (!product.origin.includes('Chính hãng') && !product.origin.includes('Authentic') && !product.origin.includes('正 品'))) {
          meetsConditions = false;
          }
          if (filterConditions.other === 'greyimport' && (!product.origin.includes('Xách tay') && !product.origin.includes('Grey import') && !product.origin.includes('平 行 进 口'))) {
          meetsConditions = false;
          }
      }
      if (filterConditions.brand && product.brand !== filterConditions.brand) {
        meetsConditions = false;
      }
      if (filterConditions.segmentation && product.segmentation !== filterConditions.segmentation) {
        meetsConditions = false;
      }
      if (filterConditions.name && !product.name.toLowerCase().includes(filterConditions.name.toLowerCase())) {
        meetsConditions = false;
      }
      return meetsConditions;
  });
  return sortProducts(filteredProducts, sortCondition).slice(startIndex, endIndex);
}

export const sortProducts = (products, condition) => {
  switch (condition) {
    case 'newest':
      return products.sort((a, b) => b.id - a.id);
    case 'top-rated':
      return products.sort((a, b) => b.rating - a.rating);
    case 'price-low-to-high':
      return products.sort((a, b) => a.price - b.price);
    case 'price-high-to-low':
      return products.sort((a, b) => b.price - a.price);
    default:
      return products;
  }
}

export const getTotalPages = async () => {
  const products = await getProducts();
  const brand = localStorage.getItem('brand') || '';
  const segmentation = localStorage.getItem('segmentation') || '';
  const filterConditions = JSON.parse(localStorage.getItem("filterConditions")) || { usageNeeds: '', ram: 0, rom: 0, screenSize: 0, operatingSystem: '', minPrice: 0, maxPrice: 0, other: '', brand: brand, segmentation: segmentation, name: ''};
  const pageLimit = parseInt(localStorage.getItem("pageLimit")) || 8; 
  const filteredProducts = products.filter(product => {
    let meetsConditions = true;
    if (filterConditions.usageNeeds && !product.usageNeeds.includes(filterConditions.usageNeeds)) {
        meetsConditions = false;
    }
    if (filterConditions.ram && product.ram !== filterConditions.ram) {
        meetsConditions = false;
    }
    if (filterConditions.rom && product.rom !== filterConditions.rom) {
        meetsConditions = false;
    }
    if (filterConditions.screenSize) {
        if (filterConditions.screenSize === 'under-6' && product.screenSize >= 6) {
        meetsConditions = false;
        } else if (filterConditions.screenSize === 'is-6' && product.screenSize !== 6) {
        meetsConditions = false;
        } else if (filterConditions.screenSize === 'over-6' && product.screenSize <= 6) {
        meetsConditions = false;
        }
    }
    if (filterConditions.operatingSystem && product.operatingSystem !== filterConditions.operatingSystem) {
        meetsConditions = false;
    }
    if (filterConditions.minPrice && product.price < filterConditions.minPrice) {
        meetsConditions = false;
    }
    if (filterConditions.maxPrice && product.price > filterConditions.maxPrice) {
        meetsConditions = false;
    }
    if (filterConditions.other) {
        if (filterConditions.other === 'discount' && product.discount <= 0) {
        meetsConditions = false;
        }
        if (filterConditions.other === 'highrating' && product.rating < 4) {
        meetsConditions = false;
        }
        if (filterConditions.other === 'authentic' && (!product.origin.includes('Chính hãng') && !product.origin.includes('Authentic') && !product.origin.includes('正 品'))) {
        meetsConditions = false;
        }
        if (filterConditions.other === 'greyimport' && (!product.origin.includes('Xách tay') && !product.origin.includes('Grey import') && !product.origin.includes('平 行 进 口'))) {
        meetsConditions = false;
        }
    }
    if (filterConditions.brand && product.brand !== filterConditions.brand) {
      meetsConditions = false;
    }
    if (filterConditions.segmentation && product.segmentation !== filterConditions.segmentation) {
      meetsConditions = false;
    }
    if (filterConditions.name && !product.name.toLowerCase().includes(filterConditions.name.toLowerCase())) {
      meetsConditions = false;
    }
    return meetsConditions;
  });
  const totalPages = Math.ceil(filteredProducts.length / pageLimit);
  localStorage.setItem("totalPages", totalPages);
  return parseInt(localStorage.getItem("totalPages"));
}

export const getNumberProducts = async () => {
  const products = await getProducts();
  const brand = localStorage.getItem('brand') || '';
  const segmentation = localStorage.getItem('segmentation') || '';
  const filterConditions = JSON.parse(localStorage.getItem("filterConditions")) || { usageNeeds: '', ram: 0, rom: 0, screenSize: 0, operatingSystem: '', minPrice: 0, maxPrice: 0, other: '', brand: brand, segmentation: segmentation, name: ''};
  const filteredProducts = products.filter(product => {
    let meetsConditions = true;
    if (filterConditions.usageNeeds && !product.usageNeeds.includes(filterConditions.usageNeeds)) {
        meetsConditions = false;
    }
    if (filterConditions.ram && product.ram !== filterConditions.ram) {
        meetsConditions = false;
    }
    if (filterConditions.rom && product.rom !== filterConditions.rom) {
        meetsConditions = false;
    }
    if (filterConditions.screenSize) {
        if (filterConditions.screenSize === 'under-6' && product.screenSize >= 6) {
        meetsConditions = false;
        } else if (filterConditions.screenSize === 'is-6' && product.screenSize !== 6) {
        meetsConditions = false;
        } else if (filterConditions.screenSize === 'over-6' && product.screenSize <= 6) {
        meetsConditions = false;
        }
    }
    if (filterConditions.operatingSystem && product.operatingSystem !== filterConditions.operatingSystem) {
        meetsConditions = false;
    }
    if (filterConditions.minPrice && product.price < filterConditions.minPrice) {
        meetsConditions = false;
    }
    if (filterConditions.maxPrice && product.price > filterConditions.maxPrice) {
        meetsConditions = false;
    }
    if (filterConditions.other) {
        if (filterConditions.other === 'discount' && product.discount <= 0) {
        meetsConditions = false;
        }
        if (filterConditions.other === 'highrating' && product.rating < 4) {
        meetsConditions = false;
        }
        if (filterConditions.other === 'authentic' && (!product.origin.includes('Chính hãng') && !product.origin.includes('Authentic') && !product.origin.includes('正 品'))) {
        meetsConditions = false;
        }
        if (filterConditions.other === 'greyimport' && (!product.origin.includes('Xách tay') && !product.origin.includes('Grey import') && !product.origin.includes('平 行 进 口'))) {
        meetsConditions = false;
        }
    }
    if (filterConditions.brand && product.brand !== filterConditions.brand) {
      meetsConditions = false;
    }
    if (filterConditions.segmentation && product.segmentation !== filterConditions.segmentation) {
      meetsConditions = false;
    }
    if (filterConditions.name && !product.name.toLowerCase().includes(filterConditions.name.toLowerCase())) {
      meetsConditions = false;
    }
    return meetsConditions;
  });
  return filteredProducts.length;
}

export const getProductByName = async (name) => {
  const products = await getProducts();
  return products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
}

export const getProductById = async (id) => {
  const products = await getProducts();
  return products.find(product => product.id === id) || null;
}

export const getTotalPriceCart = async () => {
  let totalPrice = 0;
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      const cartItem = await getProductById(cart[i].id);
      const price = cartItem.price;
      const discount = cartItem.discount;
      const quantity = cart[i].quantity;
      const value = price * quantity * (1 - discount/100);
      totalPrice += value;
    }
  }
  return totalPrice;
}

export const showNotify = (text, gravity = "top", position = "right", background="linear-gradient(to right, #4facfe 0%, #00f2fe 100%)") => {
  Toastify({
    text: text,
    duration: 2000,
    close: true,
    gravity: gravity,
    position: position,
    stopOnFocus: true,
    style: {
      background: background,
    },
  }).showToast();
}
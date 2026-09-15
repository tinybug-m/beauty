// In-memory Shopping Cart State
let cart = [];

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const msg = document.getElementById('toastMessage');
  if (toast && msg) {
    msg.textContent = message;
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-24', 'opacity-0');
    }, 2800);
  }
}

function addToCart(title, price, image) {
  const existing = cart.find((item) => item.title === title);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ title, price, image, quantity: 1 });
  }
  renderCart();
  showToast(`Added "${title}" to your bag`);
}

function updateQuantity(title, change) {
  const item = cart.find((i) => i.title === title);
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter((i) => i.title !== title);
  }
  renderCart();
}

function renderCart() {
  const listEl = document.getElementById('cartItemList');
  const emptyMsg = document.getElementById('emptyCartMessage');
  const countBadge = document.getElementById('cartCountBadge');
  const drawerCount = document.getElementById('drawerCount');
  const subtotalEl = document.getElementById('cartSubtotal');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  countBadge.textContent = totalItems;
  drawerCount.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

  if (cart.length === 0) {
    listEl.innerHTML = '';
    listEl.appendChild(emptyMsg);
    emptyMsg.classList.remove('hidden');
    return;
  }

  emptyMsg.classList.add('hidden');
  listEl.innerHTML = cart
    .map(
      (item) => `
        <div class="flex items-center gap-3 p-2 bg-brand-sand/30 rounded-2xl border border-brand-sand">
          <img src="${item.image}" alt="${item.title}" class="w-14 h-14 rounded-xl object-cover bg-white" loading="lazy" decoding="async">
          <div class="flex-1">
            <h5 class="text-xs font-bold text-brand-brown-dark">${item.title}</h5>
            <span class="text-xs text-brand-brown font-semibold">$${item.price.toFixed(2)}</span>
            <div class="flex items-center gap-2 mt-1">
              <button onclick="updateQuantity('${item.title}', -1)" class="w-5 h-5 rounded bg-white text-xs flex items-center justify-center border hover:bg-gray-50">-</button>
              <span class="text-xs font-medium">${item.quantity}</span>
              <button onclick="updateQuantity('${item.title}', 1)" class="w-5 h-5 rounded bg-white text-xs flex items-center justify-center border hover:bg-gray-50">+</button>
            </div>
          </div>
          <button onclick="updateQuantity('${item.title}', -999)" class="text-xs text-red-500 hover:text-red-700 p-1" title="Remove">✕</button>
        </div>
      `
    )
    .join('');
}

function toggleCartDrawer(open) {
  const drawer = document.getElementById('cartDrawer');
  drawer.classList.toggle('hidden', !open);
}

function handleCheckout() {
  if (cart.length === 0) {
    alert('Your bag is currently empty.');
    return;
  }
  showToast('Proceeding to encrypted secure checkout...');
  setTimeout(() => {
    alert('Thank you for choosing Naturaglow! This concludes the storefront demo checkout flow.');
    cart = [];
    renderCart();
    toggleCartDrawer(false);
  }, 700);
}

// Mobile navigation toggle
function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  nav.classList.toggle('hidden');
}

// Appointment Booking Modal
function openBookingModal() {
  document.getElementById('bookingModal').classList.remove('hidden');
}

function closeBookingModal() {
  document.getElementById('bookingModal').classList.add('hidden');
}

function prefillBooking(serviceName, specialistName) {
  openBookingModal();
  const serviceSelect = document.getElementById('modalServiceSelect');
  const specialistSelect = document.getElementById('modalSpecialistSelect');

  for (let i = 0; i < serviceSelect.options.length; i++) {
    if (serviceSelect.options[i].text.includes(serviceName)) {
      serviceSelect.selectedIndex = i;
      break;
    }
  }
  for (let i = 0; i < specialistSelect.options.length; i++) {
    if (specialistSelect.options[i].text.includes(specialistName)) {
      specialistSelect.selectedIndex = i;
      break;
    }
  }
}

function handleAppointmentSubmit(event) {
  event.preventDefault();
  closeBookingModal();
  showToast('Appointment request confirmed! We will text you shortly.');
  event.target.reset();
}

// Blog Article Reader Modal
function openArticleModal(title, excerpt) {
  document.getElementById('modalArticleTitle').textContent = title;
  document.getElementById('modalArticleContent').innerHTML = `
        <p>${excerpt}</p>
        <p>In addition to active ingredients, proper application technique determines absorption efficiency. Always warm oil-based formulas between clean palms before pressing gently into the neck and cheek contours using upwards sweeping motions.</p>
        <p class="font-medium text-brand-brown-dark">Key Takeaway: Respecting your moisture barrier with non-stripping botanicals leads to enduring luminosity without redness or sensitivity.</p>
      `;
  document.getElementById('articleModal').classList.remove('hidden');
}

function closeArticleModal() {
  document.getElementById('articleModal').classList.add('hidden');
}

// Newsletter submit
function handleNewsletterSubmit(event) {
  event.preventDefault();
  showToast('Welcome to the Naturaglow private circle!');
  event.target.reset();
}

// Close modals on Escape and backdrop-driven dialogs on outside click already wired via onclick in markup
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  closeBookingModal();
  closeArticleModal();
  toggleCartDrawer(false);
});

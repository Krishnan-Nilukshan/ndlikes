/**
 * ==========================================================================
 * ND LIKES ARCHITECTURE DATA MANAGEMENT & RUNTIME ENGINE
 * ==========================================================================
 */

// Ungal Verified Target WhatsApp Number
const WHATSAPP_DESTINATION_NUMBER = "94787418860"; 

// Global Structured Matrix Products Array
const GLOBAL_INVENTORY_REGISTRY = [
    { id: 1, name: "Quantum Pro Sound Deck", price: 299.00, rating: 5, category: "Electronics", options: ["Standard"], img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80" },
    { id: 2, name: "Vanguard Minimalist Parka", price: 145.00, rating: 4, category: "Fashion", options: ["S", "M", "L", "XL"], img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "AeroStratus Grid Runner", price: 180.00, rating: 5, category: "Shoes", options: ["41", "42", "43", "44"], img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
    { id: 4, name: "Lumiere Botanica Elixir", price: 85.00, rating: 4, category: "Beauty", options: ["50ml", "100ml"], img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80" },
    { id: 5, name: "Hyperion Mechanical Chrono", price: 540.00, rating: 5, category: "Watches", options: ["Onyx Black", "Sovereign Gold"], img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" },
    { id: 6, name: "Nordic Minimalist Lounge Unit", price: 720.00, rating: 5, category: "Home & Living", options: ["Standard"], img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80" },
    { id: 7, name: "Apex Pro Tactical Gamepad", price: 115.00, rating: 4, category: "Gaming", options: ["Wired", "Wireless Transceiver"], img: "https://images.unsplash.com/photo-1605899435973-ca2d1a8861cf?auto=format&fit=crop&w=600&q=80" },
    { id: 8, name: "Stratus Pure Type-C Hub", price: 65.00, rating: 4, category: "Electronics", options: ["Standard"], img: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=600&q=80" }
];

let activeCart = JSON.parse(localStorage.getItem('nd_likes_global_cart')) || [];
let explicitDirectCheckoutTarget = null; 

document.addEventListener("DOMContentLoaded", () => {
    initLoaderEngine();
    initNavigationDrawer();
    initCarouselSystem();
    initCartDrawerControls();
    initCatalogProcessing();
    initCheckoutPipeline();
    initScrollOptimization();
    synchronizeCartVisualState();
});

function initLoaderEngine() {
    const targetLoader = document.getElementById('loader');
    if(targetLoader) {
        window.addEventListener('load', () => targetLoader.classList.add('hide-loader'));
        setTimeout(() => targetLoader.classList.add('hide-loader'), 800);
    }
}

function initNavigationDrawer() {
    const burger = document.getElementById('menuToggle');
    const links = document.getElementById('navLinks');
    if(burger && links) {
        burger.addEventListener('click', () => links.classList.toggle('active'));
    }
}

function initScrollOptimization() {
    const bttNode = document.getElementById('backToTop');
    if(bttNode) {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 350) bttNode.classList.add('active');
            else bttNode.classList.remove('active');
        });
        bttNode.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
    }
}

function initCarouselSystem() {
    const masterSlider = document.getElementById('heroSlider');
    if(!masterSlider) return;

    const frameSlides = masterSlider.querySelectorAll('.slide');
    const btnNext = document.getElementById('nextSlide');
    const btnPrev = document.getElementById('prevSlide');
    let pointerIndex = 0;
    let transitionInterval;

    const transitionToSlide = (idx) => {
        frameSlides.forEach(s => s.classList.remove('active'));
        if(idx >= frameSlides.length) pointerIndex = 0;
        if(idx < 0) pointerIndex = frameSlides.length - 1;
        frameSlides[pointerIndex].classList.add('active');
    };

    const activateTimer = () => {
        transitionInterval = setInterval(() => {
            pointerIndex++;
            transitionToSlide(pointerIndex);
        }, 6000);
    };

    if(btnNext && btnPrev) {
        btnNext.addEventListener('click', () => { pointerIndex++; transitionToSlide(pointerIndex); refreshAutoTimer(); });
        btnPrev.addEventListener('click', () => { pointerIndex--; transitionToSlide(pointerIndex); refreshAutoTimer(); });
    }

    function refreshAutoTimer() {
        clearInterval(transitionInterval);
        activateTimer();
    }

    activateTimer();
}

function initCatalogProcessing() {
    const gridRef = document.getElementById('productsGrid');
    if(!gridRef) return;

    const liveSearchInput = document.getElementById('productSearch');
    const containerPills = document.querySelectorAll('.pill');

    const executionParams = new URLSearchParams(window.location.search);
    let selectedActiveSegment = executionParams.get('cat') || 'all';

    const renderDataMatrix = (dataset) => {
        gridRef.innerHTML = '';
        if(dataset.length === 0) {
            gridRef.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px 0; color: var(--text-muted);">No items matched your search query.</div>`;
            return;
        }

        dataset.forEach(product => {
            const nodeCard = document.createElement('div');
            nodeCard.className = 'product-card';
            
            let selectionOptionsMarkup = '';
            if(product.options && product.options.length > 0) {
                selectionOptionsMarkup = `
                    <div class="options-block">
                        <label for="select_${product.id}">Select Variant</label>
                        <select class="custom-select" id="select_${product.id}">
                            ${product.options.map(o => `<option value="${o}">${o}</option>`).join('')}
                        </select>
                    </div>`;
            }

            nodeCard.innerHTML = `
                <div class="prod-img-box">
                    <span class="cat-badge">${product.category}</span>
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" data-src="${product.img}" alt="${product.name}" class="lazy-load-img">
                </div>
                <div class="prod-info-box">
                    <h4>${product.name}</h4>
                    <div class="prod-price-row">$${product.price.toFixed(2)}</div>
                    <div class="prod-stars">${'<i class="fas fa-star"></i>'.repeat(product.rating)}</div>
                    ${selectionOptionsMarkup}
                    <div class="quantity-block">
                        <label>Quantity</label>
                        <div class="qty-ctrl">
                            <button class="qty-btn-node decrement" data-target="${product.id}">-</button>
                            <input type="text" value="1" class="qty-field" id="qty_${product.id}" readonly>
                            <button class="qty-btn-node increment" data-target="${product.id}">+</button>
                        </div>
                    </div>
                </div>
                <div class="prod-action-stack">
                    <button class="btn btn-outline btn-block trigger-add" data-id="${product.id}">Add to Bag</button>
                    <button class="btn btn-gold btn-block trigger-buy" data-id="${product.id}">Buy Now</button>
                </div>
            `;
            gridRef.appendChild(nodeCard);
        });

        executeLazyLoadingTracker();
        bindInteractiveCardElements();
    };

    containerPills.forEach(p => {
        p.classList.remove('active');
        if(p.dataset.target === selectedActiveSegment) p.classList.add('active');

        p.addEventListener('click', (e) => {
            containerPills.forEach(pill => pill.classList.remove('active'));
            e.currentTarget.classList.add('active');
            selectedActiveSegment = e.currentTarget.dataset.target;
            executeMasterFiltrationFilter();
        });
    });

    const executeMasterFiltrationFilter = () => {
        let textMatchQuery = liveSearchInput ? liveSearchInput.value.toLowerCase().trim() : '';
        let temporaryDataset = GLOBAL_INVENTORY_REGISTRY;

        if(selectedActiveSegment !== 'all') {
            temporaryDataset = temporaryDataset.filter(item => item.category === selectedActiveSegment);
        }
        if(textMatchQuery !== '') {
            temporaryDataset = temporaryDataset.filter(item => item.name.toLowerCase().includes(textMatchQuery));
        }
        renderDataMatrix(temporaryDataset);
    };

    if(liveSearchInput) {
        liveSearchInput.addEventListener('input', executeMasterFiltrationFilter);
    }

    executeMasterFiltrationFilter();
}

function executeLazyLoadingTracker() {
    const lazyImages = document.querySelectorAll('.lazy-load-img');
    if('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove('lazy-load-img');
                    imageObserver.unobserve(image);
                }
            });
        });
        lazyImages.forEach(image => imageObserver.observe(image));
    } else {
        lazyImages.forEach(image => image.src = image.dataset.src);
    }
}

function bindInteractiveCardElements() {
    document.querySelectorAll('.qty-btn-node').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const currentButton = e.currentTarget;
            const targetId = currentButton.dataset.target;
            const currentField = document.getElementById(`qty_${targetId}`);
            let currentNumericValue = parseInt(currentField.value);

            if(currentButton.classList.contains('increment')) {
                currentNumericValue++;
            } else if(currentButton.classList.contains('decrement') && currentNumericValue > 1) {
                currentNumericValue--;
            }
            currentField.value = currentNumericValue;
        });
    });

    document.querySelectorAll('.trigger-add').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.dataset.id);
            commitItemToCartDataStream(itemId, false);
        });
    });

    document.querySelectorAll('.trigger-buy').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.dataset.id);
            commitItemToCartDataStream(itemId, true);
        });
    });
}

function initCartDrawerControls() {
    const triggerToggle = document.getElementById('cartToggle');
    const triggerClose = document.getElementById('closeCart');
    const interfaceOverlay = document.getElementById('cartOverlay');
    const layoutDrawer = document.getElementById('cartDrawer');
    const checkoutCartBtn = document.getElementById('checkoutCartBtn');

    const handleOpen = () => { layoutDrawer.classList.add('active'); interfaceOverlay.classList.add('active'); };
    const handleClose = () => { layoutDrawer.classList.remove('active'); interfaceOverlay.classList.remove('active'); };

    if(triggerToggle) triggerToggle.addEventListener('click', handleOpen);
    if(triggerClose) triggerClose.addEventListener('click', handleClose);
    if(interfaceOverlay) interfaceOverlay.addEventListener('click', handleClose);

    if(checkoutCartBtn) {
        checkoutCartBtn.addEventListener('click', () => {
            if(activeCart.length === 0) {
                alert("The bag holds no items.");
                return;
            }
            handleClose();
            document.getElementById('checkoutModal').classList.add('active');
        });
    }
}

function commitItemToCartDataStream(productId, bypassDrawerRouting = false) {
    const standardProductMetadata = GLOBAL_INVENTORY_REGISTRY.find(p => p.id === productId);
    const elementSelectSelector = document.getElementById(`select_${productId}`);
    const determinedVariant = elementSelectSelector ? elementSelectSelector.value : "Standard";
    const absoluteSelectedQuantity = parseInt(document.getElementById(`qty_${productId}`).value);

    const targetDuplicateInstance = activeCart.find(item => item.id === productId && item.variant === determinedVariant);

    if(targetDuplicateInstance) {
        targetDuplicateInstance.qty += absoluteSelectedQuantity;
    } else {
        activeCart.push({
            id: standardProductMetadata.id,
            name: standardProductMetadata.name,
            price: standardProductMetadata.price,
            category: standardProductMetadata.category,
            variant: determinedVariant,
            qty: absoluteSelectedQuantity,
            img: standardProductMetadata.img
        });
    }

    localStorage.setItem('nd_likes_global_cart', JSON.stringify(activeCart));
    synchronizeCartVisualState();

    if(bypassDrawerRouting) {
        explicitDirectCheckoutTarget = {
            name: standardProductMetadata.name,
            category: standardProductMetadata.category,
            variant: determinedVariant,
            qty: absoluteSelectedQuantity,
            subtotal: (standardProductMetadata.price * absoluteSelectedQuantity).toFixed(2)
        };
        document.getElementById('checkoutModal').classList.add('active');
    } else {
        document.getElementById('cartDrawer').classList.add('active');
        document.getElementById('cartOverlay').classList.add('active');
    }
}

function synchronizeCartVisualState() {
    const counterBadgeNode = document.getElementById('cartCount');
    const sumOutputFieldNode = document.getElementById('cartTotal');
    const contentDrawerPanelNode = document.getElementById('cartItems');
    const fallbackMessageBlockNode = document.getElementById('cartEmptyMsg');

    let processingCumulativeQuantityCount = 0;
    let computedPriceAggregationValue = 0.00;

    if(contentDrawerPanelNode) contentDrawerPanelNode.innerHTML = '';

    activeCart.forEach((cartNode, spatialIndex) => {
        processingCumulativeQuantityCount += cartNode.qty;
        computedPriceAggregationValue += (cartNode.price * cartNode.qty);

        if(contentDrawerPanelNode) {
            const singleUIElementRow = document.createElement('div');
            singleUIElementRow.className = 'cart-item-row';
            singleUIElementRow.innerHTML = `
                <img src="${cartNode.img}" class="cart-item-thumb" alt="${cartNode.name}">
                <div class="cart-item-metas">
                    <h5>${cartNode.name}</h5>
                    <div class="cart-item-spec">Variant: ${cartNode.variant} | Qty: ${cartNode.qty}</div>
                    <div class="cart-item-math">$${(cartNode.price * cartNode.qty).toFixed(2)}</div>
                </div>
                <button class="cart-item-remove-btn" data-index="${spatialIndex}"><i class="fas fa-trash-alt"></i></button>
            `;
            contentDrawerPanelNode.appendChild(singleUIElementRow);
        }
    });

    if(counterBadgeNode) counterBadgeNode.textContent = processingCumulativeQuantityCount;
    if(sumOutputFieldNode) sumOutputFieldNode.textContent = `$${computedPriceAggregationValue.toFixed(2)}`;

    if(fallbackMessageBlockNode) {
        if(activeCart.length === 0) fallbackMessageBlockNode.style.display = 'block';
        else fallbackMessageBlockNode.style.display = 'none';
    }

    if(contentDrawerPanelNode) {
        contentDrawerPanelNode.querySelectorAll('.cart-item-remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const absoluteIndexPosition = parseInt(e.currentTarget.dataset.index);
                activeCart.splice(absoluteIndexPosition, 1);
                localStorage.setItem('nd_likes_global_cart', JSON.stringify(activeCart));
                synchronizeCartVisualState();
            });
        });
    }
}

function initCheckoutPipeline() {
    const targetModalNode = document.getElementById('checkoutModal');
    const modalCloseTriggerNode = document.getElementById('closeModal');
    const executionSubmissionFormNode = document.getElementById('checkoutForm');

    if(modalCloseTriggerNode && targetModalNode) {
        modalCloseTriggerNode.addEventListener('click', () => {
            targetModalNode.classList.remove('active');
            explicitDirectCheckoutTarget = null; 
        });
    }

    if(executionSubmissionFormNode) {
        executionSubmissionFormNode.addEventListener('submit', (e) => {
            e.preventDefault();

            const extractedClientName = document.getElementById('fullName').value.trim();
            const extractedClientPhone = document.getElementById('phoneNumber').value.trim();
            const extractedClientAddress = document.getElementById('address').value.trim();
            const extractedClientCity = document.getElementById('city').value.trim();
            const extractedClientCountry = document.getElementById('country').value.trim();

            let productManifestCompilationText = "";
            let financialTotalValidationString = "";

            if(explicitDirectCheckoutTarget) {
                productManifestCompilationText = `- ${explicitDirectCheckoutTarget.name}\n  Category: ${explicitDirectCheckoutTarget.category}\n  Variant: ${explicitDirectCheckoutTarget.variant}\n  Quantity: ${explicitDirectCheckoutTarget.qty}\n`;
                financialTotalValidationString = `$${explicitDirectCheckoutTarget.subtotal}`;
            } else {
                let financialRunningSum = 0;
                activeCart.forEach(element => {
                    productManifestCompilationText += `- ${element.name}\n  Category: ${element.category}\n  Variant: ${element.variant}\n  Quantity: ${element.qty}\n`;
                    financialRunningSum += (element.price * element.qty);
                });
                financialTotalValidationString = `$${financialRunningSum.toFixed(2)}`;
            }

            const rawPayloadStructureMessageString = 
`NEW ORDER - ND Likes

Products:
${productManifestCompilationText}
Customer Details:
Name: ${extractedClientName}
Phone: ${extractedClientPhone}
Address: ${extractedClientAddress}
City: ${extractedClientCity}
Country: ${extractedClientCountry}

Total Price: ${financialTotalValidationString}`;

            const encryptedUriPayloadString = encodeURIComponent(rawPayloadStructureMessageString);
            const absoluteGatewayRoutingUrlString = `https://wa.me/${WHATSAPP_DESTINATION_NUMBER}?text=${encryptedUriPayloadString}`;

            if(!explicitDirectCheckoutTarget) {
                activeCart = [];
                localStorage.removeItem('nd_likes_global_cart');
                synchronizeCartVisualState();
            }

            executionSubmissionFormNode.reset();
            targetModalNode.classList.remove('active');
            explicitDirectCheckoutTarget = null;

            window.open(absoluteGatewayRoutingUrlString, '_blank');
        });
    }
}
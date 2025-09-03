// Loading Animation dengan Promise dan async/await
document.addEventListener('DOMContentLoaded', async function() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    
    // Simulasi loading dengan Promise
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    loadingOverlay.classList.add('fade-out');
    
    // Hapus overlay setelah animasi selesai
    await new Promise(resolve => setTimeout(resolve, 500));
    loadingOverlay.style.display = 'none';

    // Mobile Menu Toggle dengan event delegation
    document.body.addEventListener('click', function(e) {
        if (e.target.id === 'mobileMenuBtn' || e.target.closest('#mobileMenuBtn')) {
            document.getElementById('mainNav').classList.toggle('active');
        }
        
        // Tutup menu mobile ketika mengklik link
        if (e.target.closest('nav ul li a') && document.getElementById('mainNav').classList.contains('active')) {
            document.getElementById('mainNav').classList.remove('active');
        }
    });

    // Smooth scrolling untuk anchor links dengan Intersection Observer
    const headerHeight = 70;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Update URL tanpa trigger scroll
                history.pushState(null, null, targetId);
            }
        });
    });

    // Test Form Submission dengan modular function
    const testForm = document.getElementById('mentalHealthTest');
    const resultModal = document.getElementById('resultModal');
    const closeModal = document.getElementById('closeModal');
    
    // Object untuk menyimpan hasil assessment
    const assessmentResults = {
        10: {
            text: 'Tingkat Kesehatan Mental: Baik',
            description: 'Hasil tes menunjukkan bahwa kesehatan mental Anda dalam kondisi baik. Anda memiliki kemampuan yang cukup untuk mengelola stres dan emosi sehari-hari.',
            suggestion: 'Pertahankan keseimbangan hidup dengan terus menjaga pola tidur teratur, makan makanan bergizi, berolahraga, dan menjaga hubungan sosial yang positif.'
        },
        20: {
            text: 'Tingkat Kesehatan Mental: Sedikit Terganggu',
            description: 'Hasil tes menunjukkan beberapa tanda gangguan kesehatan mental ringan. Ini mungkin respon normal terhadap stres kehidupan sehari-hari.',
            suggestion: 'Perhatikan pola hidup dan coba identifikasi sumber stres. Lakukan relaksasi, meditasi, atau aktivitas yang menyenangkan. Jaga komunikasi dengan orang terdekat.'
        },
        30: {
            text: 'Tingkat Kesehatan Mental: Cukup Terganggu',
            description: 'Hasil tes menunjukkan gejala gangguan kesehatan mental yang cukup signifikan. Gejala ini mungkin sudah mulai mempengaruhi fungsi sehari-hari Anda.',
            suggestion: 'Pertimbangkan untuk mencari dukungan dari profesional kesehatan mental. Coba terapkan teknik manajemen stres dan jaga rutinitas sehat. Hindari mengisolasi diri.'
        },
        40: {
            text: 'Tingkat Kesehatan Mental: Terganggu',
            description: 'Hasil tes menunjukkan gejala gangguan kesehatan mental yang signifikan. Kemungkinan besar hal ini sudah mempengaruhi kualitas hidup dan fungsi sehari-hari Anda.',
            suggestion: 'Sangat disarankan untuk berkonsultasi dengan psikolog atau psikiater. Dukungan profesional dapat membantu Anda mengelola gejala dan meningkatkan kualitas hidup.'
        },
        max: {
            text: 'Tingkat Kesehatan Mental: Sangat Terganggu',
            description: 'Hasil tes menunjukkan tingkat gangguan kesehatan mental yang serius. Gejala ini kemungkinan besar sangat mempengaruhi kehidupan Anda dan membutuhkan perhatian segera.',
            suggestion: 'Penting untuk segera mencari bantuan profesional. Hubungi psikiater, layanan kesehatan mental darurat, atau hotline dukungan sesegera mungkin.'
        }
    };

    // Fungsi untuk menghitung skor - DIPERBARUI untuk 20 pertanyaan
    function calculateScore() {
        let score = 0;
        
        // Pertanyaan 1-16 (skor normal: 0-3)
        for (let i = 1; i <= 16; i++) {
            const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
            if (selectedOption) {
                score += parseInt(selectedOption.value);
            }
        }
        
        // Pertanyaan 17-20 (skor terbalik: 3-0)
        for (let i = 17; i <= 20; i++) {
            const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
            if (selectedOption) {
                score += parseInt(selectedOption.value);
            }
        }
        
        return score;
    }

    // Fungsi untuk menentukan hasil berdasarkan skor - DIPERBARUI untuk skor 0-60
    function getResultByScore(score) {
        if (score <= 10) return assessmentResults[10];
        if (score <= 20) return assessmentResults[20];
        if (score <= 30) return assessmentResults[30];
        if (score <= 40) return assessmentResults[40];
        return assessmentResults.max;
    }

    testForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const score = calculateScore();
        const result = getResultByScore(score);
        
        // Tampilkan hasil
        document.getElementById('resultScore').textContent = `Skor Anda: ${score} - ${result.text}`;
        document.getElementById('resultDescription').textContent = result.description;
        document.getElementById('resultSuggestion').textContent = result.suggestion;
        
        // Tampilkan modal
        resultModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Scroll ke atas modal
        resultModal.scrollTo(0, 0);
    });

    // Fungsi untuk menutup modal
    function closeResultModal() {
        resultModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Event listeners untuk menutup modal
    closeModal.addEventListener('click', closeResultModal);
    
    window.addEventListener('click', function(e) {
        if (e.target === resultModal) closeResultModal();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && resultModal.style.display === 'flex') {
            closeResultModal();
        }
    });

    // Contact Form Submission dengan validasi
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validasi sederhana
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
            alert('Harap isi semua field yang diperlukan.');
            return;
        }
        
        // Validasi email sederhana
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            alert('Harap masukkan alamat email yang valid.');
            return;
        }
        
        alert('Terima kasih atas pesan Anda! Kami akan segera menghubungi Anda kembali.');
        contactForm.reset();
    });

    // Animasi on scroll dengan Intersection Observer API (lebih efisien)
    const animatedElements = document.querySelectorAll('.about-image, .resource-card, .contact-form');
    
    // Set initial state
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Gunakan Intersection Observer untuk animasi
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Berhenti mengamati setelah animasi
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Service Worker untuk PWA (jika diinginkan)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}

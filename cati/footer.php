<?php
/**
 * Универсальный футер сайта с автоматическим определением домена
 */

// Подключаем config.php если еще не подключен
if (!function_exists('displayDomain')) {
    $config_path = __DIR__ . '/config.php';
    if (file_exists($config_path)) {
        require_once $config_path;
    }
}

$base_path = function_exists('getBasePath') ? getBasePath() : '';
$current_domain = function_exists('displayDomain') ? displayDomain() : 'localhost';
?>
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Anubis</h3>
                    <p>Antik Mısır'ın geçit bekçisi</p>
                    <p style="font-size: 0.9rem; color: var(--text-gray); margin-top: 0.5rem;">
                        <?php echo $current_domain; ?>
                    </p>
                </div>
                <div class="footer-section">
                    <h4>Sayfalar</h4>
                    <ul>
                        <li><a href="<?php echo $base_path; ?>/index.php">Ana Sayfa</a></li>
                        <li><a href="<?php echo $base_path; ?>/hakkimizda.php">Hakkında Anubis</a></li>
                        <li><a href="<?php echo $base_path; ?>/rituel.php">Ritüeller</a></li>
                        <li><a href="<?php echo $base_path; ?>/galeri.php">Galeri</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Yasal</h4>
                    <ul>
                        <li><a href="#" class="modal-trigger" data-modal="cookie" onclick="openModal('cookieModal', event)">Çerez Politikası</a></li>
                        <li><a href="#" class="modal-trigger" data-modal="terms" onclick="openModal('termsModal', event)">Kullanım Şartları</a></li>
                        <li><a href="#" class="modal-trigger" data-modal="privacy" onclick="openModal('privacyModal', event)">Gizlilik Politikası</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Anubis - <?php echo $current_domain; ?>. Tüm hakları saklıdır.</p>
            </div>
        </div>
    </footer>

    <!-- Galeri Modal -->
    <div id="imageModal" class="modal">
        <div class="modal-content image-modal">
            <span class="close-modal">&times;</span>
            <div class="modal-body">
                <div class="modal-image-placeholder" id="modalImage"></div>
                <h3 id="modalImageTitle"></h3>
                <p id="modalImageDesc"></p>
            </div>
        </div>
    </div>

    <!-- Cookie Modal -->
    <div id="cookieModal" class="modal">
        <div class="modal-content">
            <span class="close-modal" onclick="closeModal(this.closest('.modal'))">&times;</span>
            <div class="modal-body">
                <h2>Çerez Politikası</h2>
                <p><strong>Son Güncelleme:</strong> 2024</p>
                
                <h3>Çerez Nedir?</h3>
                <p>Çerezler, web sitesini ziyaret ettiğinizde tarayıcınız tarafından cihazınıza kaydedilen küçük metin dosyalarıdır. Bu dosyalar, web sitesinin düzgün çalışmasını sağlar ve kullanıcı deneyimini iyileştirir.</p>
                
                <h3>Çerez Türleri</h3>
                <p>Web sitemizde aşağıdaki çerez türlerini kullanıyoruz:</p>
                <ul>
                    <li><strong>Zorunlu Çerezler:</strong> Web sitesinin temel işlevlerini yerine getirmesi için gereklidir. Bu çerezler olmadan web sitesi düzgün çalışmaz.</li>
                    <li><strong>Performans Çerezleri:</strong> Web sitesinin performansını analiz etmek ve kullanıcı deneyimini iyileştirmek için kullanılır.</li>
                    <li><strong>İşlevsellik Çerezleri:</strong> Tercihlerinizi hatırlamak ve kişiselleştirilmiş bir deneyim sunmak için kullanılır.</li>
                </ul>
                
                <h3>Çerez Yönetimi</h3>
                <p>Tarayıcınızın ayarlarından çerezleri yönetebilir veya silebilirsiniz. Ancak, bazı çerezleri devre dışı bırakmanız web sitesinin bazı özelliklerinin çalışmamasına neden olabilir.</p>
                
                <h3>Üçüncü Taraf Çerezleri</h3>
                <p>Web sitemiz, Google Maps gibi üçüncü taraf hizmetler kullanmaktadır. Bu hizmetler kendi çerez politikalarına sahiptir.</p>
                
                <p>Çerezler hakkında daha fazla bilgi için lütfen gizlilik politikamızı inceleyin.</p>
            </div>
        </div>
    </div>

    <!-- Terms Modal -->
    <div id="termsModal" class="modal">
        <div class="modal-content">
            <span class="close-modal" onclick="closeModal(this.closest('.modal'))">&times;</span>
            <div class="modal-body">
                <h2>Kullanım Şartları</h2>
                <p><strong>Son Güncelleme:</strong> 2024</p>
                
                <h3>Genel Koşullar</h3>
                <p>Bu web sitesini kullanarak, aşağıdaki kullanım şartlarını kabul etmiş olursunuz. Eğer bu şartları kabul etmiyorsanız, lütfen web sitesini kullanmayın.</p>
                
                <h3>İçerik ve Telif Hakları</h3>
                <ul>
                    <li>Web sitesi içeriği yalnızca bilgilendirme amaçlıdır.</li>
                    <li>Tüm içerikler (metinler, görseller, tasarımlar) telif hakkı koruması altındadır.</li>
                    <li>Web sitesi içeriği izinsiz kopyalanamaz, çoğaltılamaz, dağıtılamaz veya ticari amaçlarla kullanılamaz.</li>
                    <li>İçeriklerin kaynak gösterilmeden kullanılması yasaktır.</li>
                </ul>
                
                <h3>Kullanıcı Sorumlulukları</h3>
                <ul>
                    <li>Web sitesini yasalara uygun şekilde kullanmakla yükümlüsünüz.</li>
                    <li>Web sitesine zarar verecek, bozulmasına neden olacak veya güvenliğini tehdit edecek eylemlerde bulunamazsınız.</li>
                    <li>İletişim formu aracılığıyla gönderdiğiniz bilgilerin doğru ve güncel olduğundan sorumlusunuz.</li>
                </ul>
                
                <h3>Hizmet Değişiklikleri</h3>
                <p>Web sitesinin içeriği, özellikleri veya hizmetleri önceden haber vermeksizin değiştirilebilir veya durdurulabilir.</p>
                
                <h3>Sorumluluk Reddi</h3>
                <p>Web sitesinde yer alan bilgilerin doğruluğu, güncelliği veya eksiksizliği konusunda garanti verilmez. Bilgilerin kullanımından doğabilecek zararlardan sorumluluk kabul edilmez.</p>
                
                <h3>İletişim</h3>
                <p>Kullanım şartları hakkında sorularınız için lütfen bizimle iletişime geçin.</p>
            </div>
        </div>
    </div>

    <!-- Privacy Modal -->
    <div id="privacyModal" class="modal">
        <div class="modal-content">
            <span class="close-modal" onclick="closeModal(this.closest('.modal'))">&times;</span>
            <div class="modal-body">
                <h2>Gizlilik Politikası</h2>
                <p><strong>Son Güncelleme:</strong> 2024</p>
                
                <h3>Gizliliğiniz Bizim İçin Önemli</h3>
                <p>Kişisel verilerinizin korunması bizim için son derece önemlidir. Bu gizlilik politikası, web sitemizi kullanırken topladığımız bilgileri ve bu bilgileri nasıl kullandığımızı açıklamaktadır.</p>
                
                <h3>Toplanan Bilgiler</h3>
                <p>Aşağıdaki bilgileri toplayabiliriz:</p>
                <ul>
                    <li><strong>İletişim Bilgileri:</strong> İletişim formu aracılığıyla sağladığınız ad, soyad, e-posta adresi ve mesaj içeriği.</li>
                    <li><strong>Teknik Bilgiler:</strong> IP adresi, tarayıcı türü, işletim sistemi, ziyaret edilen sayfalar ve ziyaret süresi gibi teknik bilgiler.</li>
                    <li><strong>Çerezler:</strong> Web sitesinin düzgün çalışması için gerekli çerezler.</li>
                </ul>
                
                <h3>Bilgilerin Kullanımı</h3>
                <p>Topladığımız bilgiler aşağıdaki amaçlarla kullanılır:</p>
                <ul>
                    <li>İletişim taleplerinize yanıt vermek</li>
                    <li>Web sitesinin işleyişini sağlamak ve iyileştirmek</li>
                    <li>Kullanıcı deneyimini geliştirmek</li>
                    <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                </ul>
                
                <h3>Bilgilerin Paylaşımı</h3>
                <p>Kişisel bilgileriniz üçüncü taraflarla paylaşılmaz, satılmaz veya kiralanmaz. Ancak, yasal yükümlülüklerimiz gereği yetkili makamlarla paylaşılabilir.</p>
                
                <h3>Veri Güvenliği</h3>
                <p>Kişisel verilerinizin güvenliğini sağlamak için uygun teknik ve idari önlemler alınmaktadır. Ancak, internet üzerinden veri aktarımının %100 güvenli olmadığını unutmayın.</p>
                
                <h3>Çerezler</h3>
                <p>Web sitemiz çerezler kullanmaktadır. Detaylı bilgi için lütfen çerez politikamızı inceleyin.</p>
                
                <h3>Haklarınız</h3>
                <p>KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında aşağıdaki haklara sahipsiniz:</p>
                <ul>
                    <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                    <li>İşlenmişse bilgi talep etme</li>
                    <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                    <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                    <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
                    <li>Silinmesini veya yok edilmesini isteme</li>
                </ul>
                
                <h3>İletişim</h3>
                <p>Gizlilik politikası hakkında sorularınız veya haklarınızı kullanmak istiyorsanız, lütfen bizimle iletişime geçin:</p>
                <p><strong>E-posta:</strong> info@<?php echo $current_domain; ?><br>
                <strong>Adres:</strong> Türkiye, İstanbul, Sultanahmet Mah., Kabasakal Cd. 7, 2025</p>
                
                <h3>Değişiklikler</h3>
                <p>Bu gizlilik politikası zaman zaman güncellenebilir. Değişiklikler web sitesinde yayınlandığında yürürlüğe girer.</p>
            </div>
        </div>
    </div>

    <script>
        // Global function for mobile menu toggle (backup)
        function toggleMobileMenu(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            const navMenu = document.querySelector('.nav-menu');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            
            if (navMenu && mobileMenuToggle) {
                const isOpen = navMenu.classList.contains('active');
                
                if (isOpen) {
                    mobileMenuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                } else {
                    mobileMenuToggle.classList.add('active');
                    navMenu.classList.add('active');
                    document.body.classList.add('menu-open');
                    document.body.style.overflow = 'hidden';
                    document.body.style.position = 'fixed';
                    document.body.style.width = '100%';
                }
            }
            return false;
        }

        // Global function for opening modals (backup)
        function openModal(modalId, e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
            }
            return false;
        }

        // Global function for closing modals
        function closeModal(modal) {
            if (typeof modal === 'string') {
                modal = document.getElementById(modal);
            }
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
        }
    </script>
    <script src="js/main.js"></script>
</body>
</html>


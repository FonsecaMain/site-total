// ==========================================
// NUTRIDRI - ANDREIA NUTRICIONISTA JavaScript
// ========================================== 

// Verificar suporte a features modernas
const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
};

const App = {
    init() {
        document.addEventListener('DOMContentLoaded', () => this.setup());
    },

    setup() {
        this.cache();
        this.calculator.init();
        this.forms.init();
        this.navigation.init();
        this.animations.init();
        this.interactions.init();
        this.performance.init();
        console.log('✨ NutriDri App Inicializado com Sucesso!');
    },

    cache() {
        this.DOM = {
            // Calculadora
            form: document.querySelector('.calculator-form'),
            pesoInput: document.getElementById('peso'),
            alturaInput: document.getElementById('altura'),
            resultado: document.getElementById('resultado'),

            // Contato
            contactForm: document.querySelector('.contact-form'),
            contactInputs: document.querySelectorAll('.contact-form input, .contact-form textarea'),
            formSuccess: document.getElementById('form-success'),

            // Navegação
            navLinks: document.querySelectorAll('.nav-link'),
            sections: document.querySelectorAll('section[id]'),
            buttons: document.querySelectorAll('.btn'),
            cards: document.querySelectorAll('.service-card, .post, .testimonial, .portfolio-item, .recurso-item')
        };
    },

    // ==========================================
    // CALCULADORA IMC AVANÇADA
    // ==========================================
    calculator: {
        init() {
            const form = App.DOM.form;
            if (!form) return;

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.calculate();
            });

            App.DOM.pesoInput?.addEventListener('input', (e) => this.validarInput(e));
            App.DOM.alturaInput?.addEventListener('input', (e) => this.validarInput(e));
        },

        calculate() {
            const peso = parseFloat(App.DOM.pesoInput.value);
            const altura = parseFloat(App.DOM.alturaInput.value);

            if (!this.validar(peso, altura)) {
                this.exibirErro('⚠️ Por favor, preencha corretamente peso (kg) e altura (m)');
                return;
            }

            const imc = peso / (altura * altura);
            const classificacao = this.classificar(imc);
            this.exibirResultado(imc.toFixed(2), classificacao);
        },

        validar(peso, altura) {
            return !isNaN(peso) && !isNaN(altura) && peso > 0 && altura > 0 && peso < 500 && altura < 3;
        },

        classificar(imc) {
            const categorias = {
                abaixo: { imc: 18.5, label: '📉 Abaixo do Peso', msg: 'Recomenda-se consultar um nutricionista para orientações personalizadas.' },
                normal: { imc: 25, label: '✅ Peso Normal', msg: 'Parabéns! Você está em uma faixa saudável. Continue assim!' },
                sobrepeso: { imc: 30, label: '⚠️ Sobrepeso', msg: 'Considere buscar orientação nutricional para melhorar seus hábitos.' },
                obg1: { imc: 35, label: '⚠️⚠️ Obesidade Grau I', msg: 'É importante agendar uma consulta com nutricionista especializado.' },
                obg2: { imc: 40, label: '⚠️⚠️⚠️ Obesidade Grau II', msg: 'Recomenda-se acompanhamento profissional urgentemente.' },
                obg3: { label: '⚠️⚠️⚠️ Obesidade Grau III', msg: 'Procure urgentemente acompanhamento médico e nutricional especializado.' }
            };

            if (imc < categorias.abaixo.imc) return categorias.abaixo;
            if (imc < categorias.normal.imc) return categorias.normal;
            if (imc < categorias.sobrepeso.imc) return categorias.sobrepeso;
            if (imc < categorias.obg1.imc) return categorias.obg1;
            if (imc < categorias.obg2.imc) return categorias.obg2;
            return categorias.obg3;
        },

        exibirResultado(imc, classificacao) {
            const resultado = App.DOM.resultado;
            if (!resultado) return;

            resultado.innerHTML = `
                <div style="text-align: center; animation: slideInUp 0.5s ease-out;">
                    <h3 style="font-size: 2.5rem; margin-bottom: 0.5rem; color: #1a3a2e; font-weight: 900;">
                        ${imc}
                    </h3>
                    <p style="color: #2d5016; font-weight: 800; margin-bottom: 1rem; font-size: 1.3rem;">
                        ${classificacao.label}
                    </p>
                    <p style="line-height: 1.8; color: #5a6c7d; font-size: 1.05rem;">
                        ${classificacao.msg}
                    </p>
                </div>
            `;

            resultado.classList.remove('hidden');
            resultado.style.display = 'block';
            resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        },

        exibirErro(mensagem) {
            const resultado = App.DOM.resultado;
            if (!resultado) return;

            resultado.innerHTML = `<p style="text-align: center; font-size: 1.1rem;">${mensagem}</p>`;
            resultado.style.borderLeftColor = '#E74C3C';
            resultado.style.backgroundColor = '#FADBD8';
            resultado.classList.remove('hidden');
            resultado.scrollIntoView({ behavior: 'smooth' });
        },

        validarInput(e) {
            e.target.value = e.target.value.replace(/[^0-9.,]/g, '').replace(',', '.');
        }
    },

    // ==========================================
    // PERFORMANCE E OTIMIZAÇÕES
    // ==========================================
    performance: {
        init() {
            this.lazyLoadImages();
            this.monitorPerformance();
        },

        lazyLoadImages() {
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                                img.removeAttribute('data-src');
                            }
                            observer.unobserve(img);
                        }
                    });
                });

                document.querySelectorAll('img[data-src]').forEach(img => {
                    imageObserver.observe(img);
                });
            }
        },

        monitorPerformance() {
            if (window.performance && window.performance.timing) {
                window.addEventListener('load', () => {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    console.log('⚡ Tempo de carregamento: ' + pageLoadTime + 'ms');
                });
            }
        }
    }
};

// Iniciar app
App.init();

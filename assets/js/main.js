document.addEventListener('DOMContentLoaded', function() {
    // 产品详情页缩略图切换功能
    const thumbnailItems = document.querySelectorAll('.thumbnail-item');
    
    if (thumbnailItems.length > 0) {
        thumbnailItems.forEach(item => {
            item.addEventListener('click', function() {
                // 移除所有缩略图的活动状态
                thumbnailItems.forEach(thumb => {
                    thumb.classList.remove('active');
                });
                
                // 为当前点击的缩略图添加活动状态
                this.classList.add('active');
                
                // 获取目标媒体项的ID
                const targetId = this.getAttribute('data-target');
                
                // 隐藏所有媒体项
                const mediaItems = document.querySelectorAll('.product-media-item');
                mediaItems.forEach(mediaItem => {
                    mediaItem.classList.remove('active');
                });
                
                // 显示对应的媒体项
                const targetMedia = document.getElementById(targetId);
                if (targetMedia) {
                    targetMedia.classList.add('active');
                }
            });
        });
    }
    
    // 检测滚动容器是否需要显示滑动提示
    function checkScrollHint() {
        const scrollContainers = document.querySelectorAll('.solution-flow-wrapper');
        
        scrollContainers.forEach(container => {
            const scrollHint = container.closest('.solution-flow-container').querySelector('.scroll-hint');
            
            if (scrollHint) {
                // 检查内容宽度是否大于容器宽度
                const hasScroll = container.scrollWidth > container.clientWidth;
                
                if (hasScroll) {
                    scrollHint.classList.add('show');
                } else {
                    scrollHint.classList.remove('show');
                }
            }
        });
    }
    
    // 页面加载时检测
    checkScrollHint();
    
    // 窗口大小改变时重新检测
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            checkScrollHint();
        }, 250);
    });
    
    // 解决方案模块交互
    const solutionModules = document.querySelectorAll('.solution-module');
    
    solutionModules.forEach(module => {
        module.addEventListener('click', function() {
            const moduleType = this.getAttribute('data-module');
            const solutionType = this.getAttribute('data-solution');
            
            // 移除同一解决方案类型中所有模块的活动状态
            document.querySelectorAll(`.solution-module[data-solution="${solutionType}"]`).forEach(mod => {
                mod.classList.remove('active');
            });
            
            // 为当前点击的模块添加活动状态
            this.classList.add('active');
            
            // 显示对应的流程步骤内容
            const flowSteps = document.querySelectorAll(`.flow-step[data-module="${moduleType}"]`);
            
            document.querySelectorAll('.flow-step').forEach(step => {
                step.classList.remove('active');
            });
            
            flowSteps.forEach(step => {
                step.classList.add('active');
            });
        });
    });
    
    // 初始化：确保每个解决方案类型的第一个模块处于活动状态
    const solutionTypes = ['complete-line', 'single-equipment', 'custom'];
    
    solutionTypes.forEach(type => {
        const firstModule = document.querySelector(`.solution-module[data-solution="${type}"]`);
        if (firstModule) {
            firstModule.classList.add('active');
            
            const moduleType = firstModule.getAttribute('data-module');
            const flowSteps = document.querySelectorAll(`.flow-step[data-module="${moduleType}"]`);
            
            flowSteps.forEach(step => {
                step.classList.add('active');
            });
        }
    });
    
    // 处理选项卡切换事件
    const solutionTabs = document.querySelectorAll('#solutionCategories .nav-link');
    
    solutionTabs.forEach(tab => {
        tab.addEventListener('shown.bs.tab', function(event) {
            const targetId = event.target.getAttribute('data-bs-target');
            const targetPane = document.querySelector(targetId);
            
            if (targetPane) {
                // 找到目标面板中的第一个模块并激活它
                const firstModule = targetPane.querySelector('.solution-module');
                if (firstModule) {
                    firstModule.click();
                }
                
                // 切换选项卡后重新检测滑动提示
                setTimeout(function() {
                    checkScrollHint();
                }, 100);
            }
        });
    });
    
    // 处理移动设备上的滚动
    const scrollContainers = document.querySelectorAll('.category-scroll-container, .solution-flow-wrapper');
    
    scrollContainers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.classList.add('active');
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        
        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.classList.remove('active');
        });
        
        container.addEventListener('mouseup', () => {
            isDown = false;
            container.classList.remove('active');
        });
        
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
    });

    // 返回顶部按钮功能
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // 监听滚动事件，显示/隐藏按钮
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        // 点击按钮返回顶部
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 团队成员模态框
    const teamModal = document.getElementById('teamModal');
    if (teamModal) {
        teamModal.addEventListener('show.bs.modal', function(event) {
            // 获取触发模态框的元素
            const button = event.relatedTarget;
            
            // 从data属性中提取图片信息
            const image = button.getAttribute('data-image');
            
            // 更新模态框内容
            const modalImage = teamModal.querySelector('#modalImage');
            modalImage.src = image;
            
            // 使用alt属性获取职位名称作为替代文本
            const position = button.querySelector('img').getAttribute('alt');
            modalImage.alt = position;
        });
    }
    
    // 产品工作流程交互功能
    const processSteps = document.querySelectorAll('.process-step-item');
    const processImages = document.querySelectorAll('.process-image-item');
    const indicatorDots = document.querySelectorAll('.indicator-dot');
    
    // 切换流程步骤和图片的函数
    function switchProcess(processNumber) {
        // 移除所有活动状态
        processSteps.forEach(step => step.classList.remove('active'));
        processImages.forEach(img => img.classList.remove('active'));
        indicatorDots.forEach(dot => dot.classList.remove('active'));
        
        // 添加活动状态到对应元素
        const targetStep = document.querySelector(`.process-step-item[data-process="${processNumber}"]`);
        const targetImage = document.querySelector(`.process-image-item[data-image="${processNumber}"]`);
        const targetDot = document.querySelector(`.indicator-dot[data-indicator="${processNumber}"]`);
        
        if (targetStep) targetStep.classList.add('active');
        if (targetImage) targetImage.classList.add('active');
        if (targetDot) targetDot.classList.add('active');
    }
    
    // 点击流程步骤切换
    processSteps.forEach(step => {
        step.addEventListener('click', function() {
            const processNumber = this.getAttribute('data-process');
            switchProcess(processNumber);
        });
    });
    
    // 点击圆点指示器切换
    indicatorDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const indicatorNumber = this.getAttribute('data-indicator');
            switchProcess(indicatorNumber);
        });
    });
});

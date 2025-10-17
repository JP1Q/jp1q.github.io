let highestZ = 1;

// Window Management
function initializeWindows() {
    document.querySelectorAll('.window').forEach(window => {
        const taskbarProgram = addTaskbarProgram(window);
        
        window.addEventListener('mousedown', () => {
            window.style.zIndex = ++highestZ;
            document.querySelectorAll('.taskbar-program').forEach(p => p.classList.remove('active'));
            taskbarProgram.classList.add('active');
        });

        // Update window close button
        window.querySelector('.close').addEventListener('click', () => {
            window.style.display = 'none';
            taskbarProgram.remove();
        });

        // Make window draggable
        interact(window)
            .draggable({
                allowFrom: '.win95-titlebar',
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent'
                    })
                ],
                listeners: {
                    move: dragMoveListener
                }
            })
            .resizable({
                edges: { right: true, bottom: true, left: false, top: false },
                restrictEdges: {
                    outer: 'parent',
                    endOnly: true
                },
                listeners: {
                    move: resizeMoveListener
                }
            });

        // Window controls
        initializeWindowControls(window);
    });
}

function addTaskbarProgram(window) {
    const taskbarPrograms = document.querySelector('.taskbar-programs');
    const title = window.querySelector('.win95-titlebar span').textContent;
    const program = document.createElement('div');
    program.className = 'taskbar-program';
    program.innerHTML = `
        <img src="${window.dataset.icon || 'https://win98icons.alexmeub.com/icons/png/notepad-0.png'}" class="w-4 h-4">
        <span>${title}</span>
    `;
    
    program.addEventListener('click', () => {
        if (window.style.display === 'none') {
            window.style.display = 'block';
            window.style.zIndex = ++highestZ;
            program.classList.add('active');
        } else {
            window.style.display = 'none';
            program.classList.remove('active');
        }
    });
    
    taskbarPrograms.appendChild(program);
    return program;
}

function initializeWindowControls(window) {
    window.querySelector('.minimize').addEventListener('click', () => {
        window.style.height = '24px';
        window.style.overflow = 'hidden';
    });

    window.querySelector('.maximize').addEventListener('click', () => {
        if (window.style.width === '100%') {
            window.style.removeProperty('width');
            window.style.removeProperty('height');
            window.style.removeProperty('top');
            window.style.removeProperty('left');
        } else {
            window.style.width = '100%';
            window.style.height = '100%';
            window.style.top = '0';
            window.style.left = '0';
        }
    });
}

// Desktop Icons
function initializeDesktopIcons() {
    document.querySelectorAll('.desktop-icon').forEach(icon => {
        let clickCount = 0;
        let clickTimer = null;

        icon.addEventListener('click', () => {
            clickCount++;
            
            if (clickCount === 1) {
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                    icon.classList.add('selected');
                }, 250);
            } else {
                clearTimeout(clickTimer);
                clickCount = 0;
                icon.classList.remove('selected');
                
                const windowId = icon.dataset.window;
                const window = document.querySelector(`.window[data-id="${windowId}"]`);
                if (window) {
                    window.style.display = 'block';
                    window.style.zIndex = ++highestZ;
                }
            }
        });
    });
}

function dragMoveListener(event) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

function resizeMoveListener(event) {
    const target = event.target;
    let x = (parseFloat(target.getAttribute('data-x')) || 0);
    let y = (parseFloat(target.getAttribute('data-y')) || 0);

    Object.assign(target.style, {
        width: `${event.rect.width}px`,
        height: `${event.rect.height}px`,
        transform: `translate(${x}px, ${y}px)`
    });
}

// Start Menu
function initializeStartMenu() {
    const startButton = document.querySelector('.start-button');
    const startMenu = document.querySelector('.start-menu');
    
    startButton.addEventListener('click', () => {
        startMenu.classList.toggle('active');
    });

    // Close start menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.start-menu') && !e.target.closest('.start-button')) {
            startMenu.classList.remove('active');
        }
    });
}

// Stickers
function initializeStickers() {
    // ...existing stickers code...
}

// Clock
function initializeClock() {
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('cs-CZ', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Europe/Prague'
        });
        document.getElementById('clock').textContent = timeString;
    }

    updateClock();
    setInterval(updateClock, 1000);
}

// Utility functions
function dragMoveListener(event) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

function resizeMoveListener(event) {
    const target = event.target;
    let x = (parseFloat(target.getAttribute('data-x')) || 0);
    let y = (parseFloat(target.getAttribute('data-y')) || 0);

    Object.assign(target.style, {
        width: `${event.rect.width}px`,
        height: `${event.rect.height}px`,
        transform: `translate(${x}px, ${y}px)`
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeWindows();
    initializeDesktopIcons();
    initializeStartMenu();
    initializeStickers();
    initializeClock();
});

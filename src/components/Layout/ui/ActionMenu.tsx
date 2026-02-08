import React, {
    useState,
    useRef,
    useEffect,
    useLayoutEffect,
    ReactNode,
} from 'react';
import ReactDOM from 'react-dom';

export interface ActionItem {
    label: string;
    icon?: React.ElementType;
    onClick: () => void;
    danger?: boolean;
}

interface ActionMenuProps {
    trigger: (props: {
        ref: React.Ref<HTMLButtonElement>;
        onClick: (e: React.MouseEvent) => void;
        'aria-haspopup': 'menu';
        'aria-expanded': boolean;
    }) => ReactNode;

    actions: ActionItem[];
}

const EXIT_MS = 180;

const ActionMenu: React.FC<ActionMenuProps> = ({ trigger, actions }) => {
    const [open, setOpen] = useState(false);
    const [closing, setClosing] = useState(false);
    const [pos, setPos] = useState({ top: 0, left: 0 });
    const [isMobile, setIsMobile] = useState(false);

    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    /* ---------- Responsive mode ---------- */
    useEffect(() => {
        const update = () => {
            setIsMobile(
                window.innerWidth < 640 || window.innerHeight < 500
            );
        };
        update();
        window.addEventListener('resize', update);
        window.addEventListener('orientationchange', update);
        return () => {
            window.removeEventListener('resize', update);
            window.removeEventListener('orientationchange', update);
        };
    }, []);

    /* ---------- Open / Close ---------- */
    const close = () => {
        setClosing(true);
        setTimeout(() => {
            setOpen(false);
            setClosing(false);
        }, EXIT_MS);
    };

    const openMenu = () => {
        const btn = triggerRef.current;
        if (btn && !isMobile) {
            const r = btn.getBoundingClientRect();
            const menuW = 160;
            const menuH = actions.length * 40;

            let left = r.right - menuW;
            let top = r.bottom + 6;

            if (left < 8) left = r.left;
            if (top + menuH > window.innerHeight) {
                top = r.top - menuH - 6;
            }

            setPos({
                top: Math.max(8, top + window.scrollY),
                left: Math.max(8, left + window.scrollX),
            });
        }
        setOpen(true);
    };

    /* ---------- Outside click (tablet-safe) ---------- */
    useEffect(() => {
        if (!open) return;

        const handler = (e: PointerEvent) => {
            const target = e.target as Node;
            if (menuRef.current?.contains(target)) return;
            if (triggerRef.current?.contains(target)) return;
            close();
        };

        document.addEventListener('pointerdown', handler, true);
        return () =>
            document.removeEventListener('pointerdown', handler, true);
    }, [open]);

    /* ---------- Keyboard ---------- */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);

    useLayoutEffect(() => {
        if (!menuRef.current) return;

        const items = menuRef.current.querySelectorAll<HTMLButtonElement>(
            'button[role="menuitem"]'
        );
        items[0]?.focus();

        const onKey = (e: KeyboardEvent) => {
            const index = Array.from(items).indexOf(
                document.activeElement as HTMLButtonElement
            );
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                items[(index + 1) % items.length]?.focus();
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                items[(index - 1 + items.length) % items.length]?.focus();
            }
        };

        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open]);

    /* ---------- Menu UI ---------- */
    const menu = open ? (
        isMobile ? (
            <div className="fixed inset-0 z-50">
                <div
                    className={`absolute inset-0 bg-black/40 transition-opacity ${closing ? 'opacity-0' : 'opacity-100'
                        }`}
                />
                <div
                    ref={menuRef}
                    role="menu"
                    className={`
                        absolute bottom-0 left-0 right-0
                        rounded-t-xl bg-white dark:bg-gray-900
                        shadow-xl p-2
                        transition-transform duration-200
                        ${closing ? 'translate-y-full' : 'translate-y-0'}
                    `}
                >
                    <div className="mx-auto mb-2 h-1 w-10 rounded bg-gray-300" />
                    {actions.map(({ label, icon: Icon, onClick, danger }) => (
                        <button
                            key={label}
                            role="menuitem"
                            onClick={() => {
                                onClick();
                                close();
                            }}
                            className={`
                                flex w-full items-center gap-3 px-4 py-3 text-sm rounded-lg
                                ${danger
                                    ? 'text-red-600 hover:bg-red-50'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                }
                            `}
                        >
                            {Icon && <Icon className="w-4 h-4" />}
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        ) : (
            <div
                ref={menuRef}
                role="menu"
                style={{ top: pos.top, left: pos.left }}
                className={`
                    fixed z-50 w-40 rounded-md
                    border bg-white dark:bg-gray-900 shadow-lg
                    transition-all duration-150
                    ${closing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
                `}
            >
                {actions.map(({ label, icon: Icon, onClick, danger }) => (
                    <button
                        key={label}
                        role="menuitem"
                        onClick={() => {
                            onClick();
                            close();
                        }}
                        className={`
                            flex w-full items-center gap-2 px-3 py-2 text-sm
                            ${danger
                                ? 'text-red-600 hover:bg-red-50'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                            }
                        `}
                    >
                        {Icon && <Icon className="w-4 h-4" />}
                        {label}
                    </button>
                ))}
            </div>
        )
    ) : null;

    return (
        <>
            {trigger({
                ref: triggerRef,
                onClick: (e) => {
                    e.stopPropagation();
                    open ? close() : openMenu();
                },
                'aria-haspopup': 'menu',
                'aria-expanded': open,
            })}
            {open && ReactDOM.createPortal(menu, document.body)}
        </>
    );
};

export default ActionMenu;

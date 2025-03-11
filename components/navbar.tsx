import Logo from "@/public/logo";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center  p-9">
            <a href="/" aria-label="Home">
                <Logo />
            </a>
        </div>
    );
}
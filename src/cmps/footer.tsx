import Link from "next/link"

export const Footer = () => {
    return <div className="footer">
        <div className="flex space-between align-center main-content">
            <p>All Copyright Reserved &#169;</p>
            <p>
                Project created by <Link href="https://nivb.netlify.app" target="_blank">Niv</Link>
            </p>
        </div>
    </div>
}

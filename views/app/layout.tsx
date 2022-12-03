import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode
}

function Layout(props: LayoutProps) {

  return (
    <div >
      <div>
        <main className="flex-1 bg-slate-100" >{props.children}</main>
      </div>
    </div>
  )
}

export default Layout
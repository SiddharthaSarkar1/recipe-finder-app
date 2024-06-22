import React from 'react'

const SideBar = () => {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  )
}

export default SideBar

const DesktopSidebar = () => {
    return(
        <div className="p-3 md:p-10 border-r min-h-screen w-24 md:w-64 hidden sm:block">

        </div>
    )
}

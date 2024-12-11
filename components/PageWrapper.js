export default function PageWrapper({children}) {
    return (
        <div className="flex flex-col w-full align-center gap-4 m-8">
            {children}
        </div>
    )
};
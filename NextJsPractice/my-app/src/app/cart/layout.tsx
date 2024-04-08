export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): JSX.Element {
    return (
        <>
            {children}
            <div>
                <p>삼성카드 무이자 이벤트 중입니다</p>
            </div>
        </>
    );
}

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): JSX.Element {
    return (
        <>
            {children}
            <div>
                <p style={{ textAlign: "center", margin: "1em 0" }}>삼성카드 무이자 이벤트 중입니다!</p>
            </div>
        </>
    );
}

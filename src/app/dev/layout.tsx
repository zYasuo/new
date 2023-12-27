



export const metadata = {
 title: 'Dev Page',
 description: 'Page for development purposes',
};



export default function DevLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}
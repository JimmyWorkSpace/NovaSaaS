import GlobalHeader from "./GlobalHeader";
import SystemNotice from "./SystemNotice";
import GlobalFooter from "./GlobalFooter";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <div className="ns-layout">
      <GlobalHeader />

      <SystemNotice
        subscriptionExpired={false}
        insufficientCredits={false}
        socialInvalid={false}
      />

      <main className="ns-content">
        {children}
      </main>

      <GlobalFooter />
    </div>
  );
}

export default MainLayout;

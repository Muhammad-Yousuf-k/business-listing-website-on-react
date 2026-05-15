import Btntwo from "../small compo/Btn-two";

const Header = ({ title, onMenu, onBack, isBack, isBTN, isBTNText, onBTN }) => (
  <>
    <div className="flex items-center justify-between lg:hidden mb-4">
      <button
        type="button"
        aria-label="Open sidebar"
        className="text-xl font-bold"
        onClick={onMenu}
      >
        ☰
      </button>

      <h1
        className="text-lg font-semibold"
        style={{ color: "var(--text-main)" }}
      >
        {title}
      </h1>
    </div>

    <div className="hidden lg:flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold" style={{ color: "var(--text-main)" }}>
        {title}
      </h1>

      {isBack && (
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg text-sm"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-default)",
            color: "var(--text-main)",
          }}
        >
          Back
        </button>
      )}
      {isBTN && (
        <>
        <Btntwo text={isBTNText} path={onBTN}/>
        
          </>
      )}
    </div>
  </>
);

export default Header;

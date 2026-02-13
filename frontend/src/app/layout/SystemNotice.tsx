type Props = {
  subscriptionExpired: boolean;
  insufficientCredits: boolean;
  socialInvalid: boolean;
};

function SystemNotice({
  subscriptionExpired,
  insufficientCredits,
  socialInvalid
}: Props) {
  if (!subscriptionExpired && !insufficientCredits && !socialInvalid) {
    return null;
  }

  return (
    <div className="ns-system-notice">
      {subscriptionExpired && <span>Subscription Expired</span>}
      {insufficientCredits && <span>Insufficient Credits</span>}
      {socialInvalid && <span>Social Auth Invalid</span>}
    </div>
  );
}

export default SystemNotice;

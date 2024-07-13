import { ComponentType, useEffect, useState } from 'react';
import {
  ApiProvider as GearApiProvider,
  AlertProvider as GearAlertProvider,
  AccountProvider,
  ProviderProps,
} from '@gear-js/react-hooks';
// import {
//   SignlessTransactionsProvider as SharedSignlessTransactionsProvider,
//   GaslessTransactionsProvider as SharedGaslessTransactionsProvider,
//   EzTransactionsProvider,
// } from '@dapps-frontend/ez-transactions';
import { DnsProvider as SharedDnsProvider } from '@/vendor/gear/providers';
import { ENV } from '@/constants/consts';
import { AppProvider } from '@/context/ctx-app';
import { Alert, alertStyles } from '@/vendor/gear/ui/components/alert';

const ApiProvider = ({ children }: ProviderProps) => (
  <GearApiProvider initialArgs={{ endpoint: ENV.NODE }}>
    {children}
  </GearApiProvider>
);

function DnsProvider({ children }: ProviderProps) {
  return (
    <SharedDnsProvider
      names={{ programId: ENV.DNS_NAME! }}
      dnsApiUrl={ENV.DNS_API_URL!}
    >
      {children}
    </SharedDnsProvider>
  );
}

const AlertProvider = ({ children }: ProviderProps) => (
  <GearAlertProvider template={Alert} containerClassName={alertStyles.root}>
    {children}
  </GearAlertProvider>
);

// function GaslessTransactionsProvider({ children }: ProviderProps) {
//   const { programId } = useDnsProgramIds();
//
//   return (
//     <SharedGaslessTransactionsProvider
//       programId={programId}
//       backendAddress={ENV.GASLESS_BACKEND}
//       voucherLimit={18}
//     >
//       {children}
//     </SharedGaslessTransactionsProvider>
//   );
// }
//
// function SignlessTransactionsProvider({ children }: ProviderProps) {
//   const { programId } = useDnsProgramIds();
//   return (
//     <SharedSignlessTransactionsProvider
//       programId={programId}
//       metadataSource={metaTxt}
//     >
//       {children}
//     </SharedSignlessTransactionsProvider>
//   );
// }

const providers = [
  AlertProvider,
  ApiProvider,
  // DnsProvider,
  AccountProvider,
  AppProvider,
];

export const withProviders = (Component: ComponentType) => () => {
  // const [isMounted, setIsMounted] = useState(false);
  //
  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);
  //
  // if (!isMounted) return <p>LOADINGGG...</p>;

  return providers.reduceRight(
    (children, Provider) => <Provider>{children}</Provider>,
    <Component />,
  );
};

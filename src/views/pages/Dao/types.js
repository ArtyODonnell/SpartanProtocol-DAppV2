export const proposalTypes = [
  {
    value: 'GET_SPARTA',
    label: 'Bond: New Allocation',
    desc: 'Release a Bond Allocation:',
    type: 'Action',
  },
  {
    value: 'LIST_BOND',
    label: 'Bond: List Bond Asset',
    desc: 'Enable a new bond asset:',
    type: 'Address',
  },
  {
    value: 'DELIST_BOND',
    label: 'Bond: Delist Bond Asset',
    desc: 'Disable a bond asset:',
    type: 'Address',
  },
  {
    value: 'FLIP_EMISSIONS',
    label: 'Base: Emissions On/Off',
    desc: 'Switch the BASE emissions:',
    type: 'Action',
  },
  {
    value: 'REALISE',
    label: 'Pools: Burn synth-premium',
    desc: 'Increase liquidity provider pool-ownership:',
    type: 'Address',
  },
  {
    value: 'ADD_CURATED_POOL',
    label: 'Pools: Add Curated',
    desc: 'Add to the curated list:',
    type: 'Address',
  },
  {
    value: 'REMOVE_CURATED_POOL',
    label: 'Pools: Remove Curated',
    desc: 'Remove from the curated list:',
    type: 'Address',
  },
  {
    value: 'SYNTH_CLAIM',
    label: 'SynthVault: Regulate Claim %',
    desc: 'Change SynthVault claim % to:',
    units: 'basis points',
    type: 'Param',
  },
  {
    value: 'DAO_CLAIM',
    label: 'DAOVault: Regulate Claim %',
    desc: 'Change DaoVault claim % to:',
    units: 'basis points',
    type: 'Param',
  },
  {
    value: 'COOL_OFF',
    label: 'DAO: Change Cooloff',
    desc: 'Change DAO CoolOff period to:',
    units: 'seconds',
    type: 'Param',
  },
  {
    value: 'GRANT',
    label: 'DAO: Grant SPARTA',
    desc: 'Grant funds to a Spartan:',
    units: 'SPARTA',
    type: 'Grant',
  },
  {
    value: 'DAO',
    label: 'DAO: Change Contract',
    desc: 'Change the DAO contract:',
    type: 'Address',
  },
  {
    value: 'ROUTER',
    label: 'Router: Change Contract',
    desc: 'Change Router contract:',
    type: 'Address',
  },
  {
    value: 'UTILS',
    label: 'Utils: Change Contract',
    desc: 'Change Utils contract:',
    type: 'Address',
  },
  {
    value: 'RESERVE',
    label: 'Reserve: Change Contract',
    desc: 'Change Reserve contract:',
    type: 'Address',
  },
]

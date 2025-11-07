// Capabilities registry - imports all capability definitions for the manager

// TO ADD NEW CAPABILITIES
// import the capability definition you've defined in the main file of your capability and add to the list below
import { CapabilityDefinition } from './capability';
import { SUMMARIZER_CAPABILITY_DEFINITION } from './summarizer/summarize';
import { ACTION_ITEMS_CAPABILITY_DEFINITION } from './actionItems/actionItems';
import { SEARCH_CAPABILITY_DEFINITION } from './search/search';

export const CAPABILITY_DEFINITIONS: CapabilityDefinition[] = [
  SUMMARIZER_CAPABILITY_DEFINITION,
  ACTION_ITEMS_CAPABILITY_DEFINITION,
  SEARCH_CAPABILITY_DEFINITION
];

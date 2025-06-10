import { storeToRefs } from 'pinia';
import { useIssuesStore } from 'src/stores/issues';


// MANTENER AISLADA LA DEPENDENCIA CON TERCEROS
const useStore = () => {

  const issuesStore = useIssuesStore()
  const { labels, state } = storeToRefs(issuesStore); // Desestructuracion reactiva
  return {
    //REACTIVE PROPERTIES
    labels,
    state

    // GETTERS (computed)


    //METHODS
  }
}

export default useStore;

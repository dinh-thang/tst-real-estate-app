import FilterForm from "../components/buyer-preference/FilterForm";
import PropertiesContainer from "../components/buyer-preference/PropertiesContainer";


export default function BuyerPreferencePage() {

  return (
    <main className="flex flex-row h-full">
      <FilterForm />
      <PropertiesContainer />
    </main>
  );
}
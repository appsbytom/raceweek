import SeriesLayout from '@/components/Layout/SeriesLayout'
import { usePreferences } from '@/components/PreferencesContext'
import { getRaces } from '@/lib/fe'
import { Race } from '@/types/race'

type Props = {
  races: Race[]
}

export const getStaticProps = async () => ({ props: { races: getRaces() }})

const FE = ({ races }: Props) => {
  const { followedSessions: { fe }} = usePreferences()

  return (
    <SeriesLayout
      followedSessions={fe}
      disclaimer="Formula-E, FIA FORMULA-E CHAMPIONSHIP & E-Prix are trademarks of the FIA."
      races={races}
    />
  )
}

export default FE
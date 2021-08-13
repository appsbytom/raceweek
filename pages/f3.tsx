import SeriesLayout from '@/components/Layout/SeriesLayout'
import { usePreferences } from '@/components/PreferencesContext'
import { getRaces } from '@/lib/f2f3/f3'
import { Race } from '@/types/race'

type Props = {
  races: Race[]
}

export const getStaticProps = async () => ({ props: { races: await getRaces() }})

const F3 = ({ races }: Props) => {
  const { followedSessions: { f3 }} = usePreferences()

  return (
    <SeriesLayout
      followedSessions={f3}
      races={races}
      disclaimer="FIA FORMULA 3 CHAMPIONSHIP, FIA FORMULA 3, FORMULA 3, F3 are trademarks of the FIA."
    />
  )
}

export default F3
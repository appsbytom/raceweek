import SeriesLayout from '@/components/Layout/SeriesLayout'
import { usePreferences } from '@/components/PreferencesContext'
import { getRaces } from '@/lib/f1/f1'
import { Race } from '@/types/race'

type Props = {
  races: Race[]
}

export const getStaticProps = async () => ({ props: { races: await getRaces() }})

const F1 = ({ races }: Props) => {
  const { followedSessions: { f1 }} = usePreferences()

  return (
    <SeriesLayout
      followedSessions={f1}
      races={races}
      disclaimer="Formula One, Formula 1, F1 & Grand Prix are trademarks of Formula One Licensing BV."
    />
  )
}

export default F1
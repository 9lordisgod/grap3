import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DiscoveryScreen } from '../screens/DiscoveryScreen';
import { MatchesScreen } from '../screens/MatchesScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { TabBar, TabKey } from '../components/ui/TabBar';
import { MatchModal } from '../components/ui/MatchModal';
import { Profile } from '../components/SwipeDeck';
import { AVATARS } from '../constants/avatars';
import { colors } from '../theme/theme';

export function AppShell() {
  const [tab, setTab] = useState<TabKey>('discover');
  const [chatWith, setChatWith] = useState<string | null>(null);
  const [match, setMatch] = useState<Profile | null>(null);

  if (chatWith) {
    return (
      <View style={styles.root}>
        <ChatScreen name={chatWith} onBack={() => setChatWith(null)} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {tab === 'discover' && <DiscoveryScreen onMatch={setMatch} />}
      {tab === 'matches' && <MatchesScreen onOpenChat={setChatWith} />}
      {tab === 'profile' && <ProfileScreen />}

      <TabBar active={tab} onChange={setTab} badge={1} />

      {match && (
        <MatchModal
          visible={!!match}
          name={match.name}
          photo={match.photo}
          myPhoto={AVATARS.me}
          score={match.matchScore ?? 0.9}
          onMessage={() => { setChatWith(match.name); setMatch(null); setTab('matches'); }}
          onKeepSwiping={() => setMatch(null)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
});
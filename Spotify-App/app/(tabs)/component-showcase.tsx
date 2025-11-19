import { Image as ExpoImage } from 'expo-image';
import { StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ComponentShowcase() {
  const colorScheme = useColorScheme();
  const { width } = Dimensions.get('window');
  const [likeCount, setLikeCount] = useState(0);
  return (
    <ParallaxScrollView
      indicatorStyle={colorScheme === 'dark' ? 'white' : 'black'}
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <ExpoImage
          source={require('@/assets/images/background.jpg')}
          style={[styles.headerImage, { width }]}
          contentFit="cover"
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Ren Moromasa</ThemedText>
      </ThemedView>

      {/* About Me Section */}
      <Collapsible title="About Me">
        <ThemedText>
          Hello! I'm{' '}
          <ThemedText style={styles.highlight}>Ren Moromasa</ThemedText>, a student
          currently taking up{' '}
          <ThemedText style={styles.highlight}>Advanced Mobile Development</ThemedText>.  
          I enjoy building apps, experimenting with design, and solving coding challenges.
        </ThemedText>

        <ThemedText style={{ marginTop: 10 }}>
          Outside of coding, I’m passionate about exploring new ideas, learning different tech stacks, 
          and creating projects that combine both creativity and logic.  
        </ThemedText>

        <ThemedText style={{ marginTop: 10 }}>
          My long-term goal is to keep growing as a developer, work on real-world applications, 
          and eventually contribute to projects that make life easier and more enjoyable.
        </ThemedText>

        <ThemedText style={{ marginTop: 10 }}>
          Thanks for stopping by my profile — feel free to drop a like and check out the other sections below!
        </ThemedText>
      </Collapsible>

      {/* Like Button Section */}
      <Collapsible title="Like Button">
        <ThemedText>This button is for liking my profile!</ThemedText>

        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => setLikeCount(likeCount + 1)}>
          <Text style={styles.likeButtonText}>Like</Text>
        </TouchableOpacity>

        <ThemedText style={{ marginTop: 8 }}>👍 Likes: {likeCount}</ThemedText>
      </Collapsible>

      {/* Image Section */}
      <Collapsible title="Image Component">
        <ExpoImage
          source={require('@/assets/images/friend.jpg')}
          style={styles.image}
          contentFit="contain"
        />
        <ThemedText>This is my friend.</ThemedText>

        <ExpoImage
          source={require('@/assets/images/money-wallet.gif')}
          style={styles.image}
          contentFit="contain"
        />
        <ThemedText>This is me when I look at my wallet everytime.</ThemedText>
      </Collapsible>

    {/* Skills Section */}
        <Collapsible title="Skills & Interests">
            <ThemedText style={{ marginBottom: 10 }}>
            Here’s a scrollable list of my skills and interests:
            </ThemedText>

            {[
            // Technical Skills
            'C Programming',
            'Data Structures & Algorithms',
            'Networking (CCNA)',
            'Web Development Basics',
            'UI/UX Design',
            'Database Management (MySQL)',
            'Version Control (Git & GitHub)',
            // Learning & Academic Interests
            'Learning new programming languages',
            'Exploring different tech stacks',
            'Studying system design & architecture',
            'Experimenting with AI & automation',
            'Working on coding challenges & exercises',

            // Creative & Personal Interests
            'Designing personal projects',
            'Gaming (for creativity & strategy)',
            'Music (helps me focus)',
            'Exploring memes',
            'Trying out UI animations & transitions ',

            // Future Aspirations
            'Building impactful applications',
            'Collaborating on open-source projects',
            'Contributing to the dev community',
            ].map((item, index) => (
            <ThemedText key={index} style={{ marginBottom: 6 }}>
                • {item}
            </ThemedText>
            ))}
        </Collapsible>
        </ParallaxScrollView>
    );    
}

const styles = StyleSheet.create({
  headerImage: {
    height: 300,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  likeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  likeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
